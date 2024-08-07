package com.nomz.doctorstudy.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.nomz.doctorstudy.image.ImageType;
import com.nomz.doctorstudy.image.MediaType;
import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.exception.FileException;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.image.request.MediaUploadRequest;
import com.nomz.doctorstudy.image.response.FileResponse;
import com.nomz.doctorstudy.image.response.ImageResponse;
import com.nomz.doctorstudy.image.response.MediaResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class MediaService {
    private final ImageRepository imageRepository;
    private final S3Service s3Service;
    private final AmazonS3 amazonS3;
    private final String serviceName = "dr-study";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public FileResponse save(MediaUploadRequest mediaUploadRequest){
        MultipartFile file = mediaUploadRequest.getFile();
//        String domain = mediaUploadRequest.getDomain();

        MediaType fileType = validateFileType(file);


//        String type;
        return switch (fileType) {
            case JPG, PNG, JPEG -> saveImage(mediaUploadRequest);
            case MP3 -> saveMedia(mediaUploadRequest, "audio");
            case MP4 -> saveMedia(mediaUploadRequest, "video");
            default -> {
                log.info("지원하지 않는 파일인데 여기 까지 뚫었네");
                throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
            }
        };


    }

    private MediaType validateFileType(MultipartFile file){
        if(file.isEmpty() || Objects.isNull(file.getOriginalFilename())){
            log.info("파일이 없습니다.");
            throw new FileException(FileErrorCode.FILE_NOT_FOUND);
        }

        return validateFileExtension(file.getOriginalFilename());

    }

    private MediaType validateFileExtension(String fileName){
        int lastDotIndex = fileName.lastIndexOf(".");

        if(lastDotIndex == -1){
            log.info("파일에 확장자가 없는데요?");
            throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
        }

        String extension = fileName.substring(lastDotIndex + 1).toLowerCase();


        return MediaType.fromExtension(extension);

    }

    private String filePath(String type, String domain){
        if(domain == null || domain.isEmpty()){
            return bucket + "/" + serviceName + "/" + type;
        }

        return bucket + "/" + serviceName + "/" + type + "/" + domain;
    }

    private FileResponse saveImage(MediaUploadRequest mediaUploadRequest){

        if(mediaUploadRequest.getDomain() == null){
            throw new FileException(FileErrorCode.DOMAIN_NOT_EXIST);
        }

        if(!ImageType.contains(mediaUploadRequest.getDomain())){
            throw new FileException(FileErrorCode.NO_VALID_DOMAIN);
        }

        try{
            String filePath = filePath("images", mediaUploadRequest.getDomain());
            String saveS3Url = s3Service.save(mediaUploadRequest.getFile(), filePath);

            Image image = Image.builder()
                    .imageUrl(saveS3Url)
                    .build();

            Image saveImage = imageRepository.save(image);

            return ImageResponse
                    .builder()
                    .imageId(saveImage.getId())
                    .imageUrl(saveImage.getImageUrl())
                    .build();
        } catch(Exception e){
            log.error("이미지 저장 실패: {}", e.getMessage());
            throw new FileException(FileErrorCode.IMAGE_UPLOAD_FAIL);
        }

    }

    private FileResponse saveMedia(MediaUploadRequest mediaUploadRequest, String type){
        log.info("mediaUploadRequest = {}", mediaUploadRequest.getDomain());

        if(mediaUploadRequest.getDomain() != null){
            throw new FileException(FileErrorCode.DOMAIN_EXIST);
        }

        try{
            String filePath = filePath(type, mediaUploadRequest.getDomain());

            String url = s3Service.save(mediaUploadRequest.getFile(), filePath);

            return MediaResponse
                    .builder()
                    .mediaUrl(url)
                    .build();
        } catch(Exception e){
            log.error("{} 저장 실패: {}", type, e.getMessage());
            throw new FileException(FileErrorCode.MEDIA_UPLOAD_FAIL);
        }

    }




}
