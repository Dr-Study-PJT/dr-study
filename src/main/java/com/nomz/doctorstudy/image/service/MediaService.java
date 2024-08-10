package com.nomz.doctorstudy.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.nomz.doctorstudy.image.ImageDomainType;

import com.nomz.doctorstudy.image.ImageFileType;
import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.exception.FileException;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.image.request.ImageUploadRequest;
import com.nomz.doctorstudy.image.request.SaveS3MediaRequest;
import com.nomz.doctorstudy.image.response.ImageResponse;
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
    private final String serviceName = "dr-study";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public ImageResponse saveImg(ImageUploadRequest imageUploadRequest){
        MultipartFile file = imageUploadRequest.getFile();
//        String domain = mediaUploadRequest.getDomain();

        validateImageFile(file);

        if(imageUploadRequest.getDomain() == null){
            throw new FileException(FileErrorCode.DOMAIN_NOT_EXIST);
        }

        if(!ImageDomainType.contains(imageUploadRequest.getDomain())){
            throw new FileException(FileErrorCode.NO_VALID_DOMAIN);
        }

        try{
            String filePath = bucket + "/" + serviceName + "/" + "images" + "/" + imageUploadRequest.getDomain();
            SaveS3MediaRequest saveS3MediaRequest = SaveS3MediaRequest
                    .builder()
                    .file(imageUploadRequest.getFile())
                    .filePath(filePath)
                    .build();

            String saveS3Url = s3Service.save(saveS3MediaRequest);

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

    @Transactional
    public String saveAudio(MultipartFile file){
        validateAudioFile(file);

        log.info("save Audio fileName = {}", file.getOriginalFilename());

        try{
            String filePath = bucket + "/" + serviceName + "/" + "audio";

            SaveS3MediaRequest saveS3MediaRequest = SaveS3MediaRequest
                    .builder()
                    .file(file)
                    .filePath(filePath)
                    .build();

            String url = s3Service.save(saveS3MediaRequest);
            log.info("s3serviceSave url = {}", url);
            return url;

        } catch(Exception e){
            log.error("audio 저장 실패: {}", e.getMessage());
            throw new FileException(FileErrorCode.MEDIA_UPLOAD_FAIL);
        }

    }



    private String validateFile(MultipartFile file){
        if(file.isEmpty() || Objects.isNull(file.getOriginalFilename())){
            log.info("파일이 없습니다.");
            throw new FileException(FileErrorCode.FILE_NOT_FOUND);
        }

        String fileName = file.getOriginalFilename();
        int lastDotIndex = fileName.lastIndexOf(".");

        if(lastDotIndex == -1){
            log.info("파일에 확장자가 없는데요?");
            throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
        }

        return fileName.substring(lastDotIndex + 1).toLowerCase();

    }

    private void validateImageFile(MultipartFile file){
        String extension = validateFile(file);
        log.info("validateImageFile, extension = {}", extension);

        if(!ImageFileType.contains(extension)){
            throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
        }

    }

    private void validateAudioFile(MultipartFile file){
        String extension = validateFile(file);
        log.info("validateAudioFile = {}", extension);

        if(!extension.equalsIgnoreCase("mp3")){
            throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
        }
    }

}
