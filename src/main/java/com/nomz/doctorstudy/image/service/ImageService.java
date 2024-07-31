package com.nomz.doctorstudy.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.exception.ImageErrorCode;
import com.nomz.doctorstudy.image.exception.ImageException;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.image.request.ImageUploadRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService{

    private final ImageRepository imageRepository;

    private final AmazonS3 amazonS3;
    private final String serviceName = "dr-study";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @Transactional
    public String save(ImageUploadRequest imageUploadRequest) {
        MultipartFile image = imageUploadRequest.getFile();
        String type = imageUploadRequest.getType();

        validateImageFile(image);

        try{
            String s3Url = uploadImageS3(image, type);
            log.info("service s3URL = {}", s3Url);
            Image uploadImage = Image.builder()
                    .imageUrl(s3Url)
                    .build();
            imageRepository.save(uploadImage);

            return s3Url;

//            return uploadImageS3(image, type);
        } catch(IOException e){
            throw new ImageException(ImageErrorCode.IMAGE_UPLOAD_FAIL);
        }

    }

    private void validateImageFile(MultipartFile image){
        if(image.isEmpty() || Objects.isNull(image.getOriginalFilename())){
            throw new ImageException(ImageErrorCode.IMAGE_EMPTY);
        }

        validateImageFileExtention(image.getOriginalFilename());
    }

    private void validateImageFileExtention(String filename){
        int lastDotIndex = filename.lastIndexOf(".");

        if(lastDotIndex == -1){
            throw new ImageException(ImageErrorCode.NO_ACCESS_FILE_EXTENTION);
        }

        String extention = filename.substring(lastDotIndex + 1).toLowerCase();
        List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");

        if (!allowedExtentionList.contains(extention)) {
            throw new ImageException(ImageErrorCode.NO_ACCESS_FILE_EXTENTION);
        }

    }

    private String uploadImageS3(MultipartFile image, String type) throws IOException{
        String originalFilename = image.getOriginalFilename(); //원본 파일 명
        String extention = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명

        String filePath = s3FilePath(type);
        String s3FileName = UUID.randomUUID().toString().substring(0, 10) + originalFilename; //변경된 파일 명

        InputStream is = image.getInputStream();
        byte[] bytes = IOUtils.toByteArray(is); //image를 byte[]로 변환

        ObjectMetadata metadata = new ObjectMetadata(); //metadata 생성
        metadata.setContentType("image/" + extention);
        metadata.setContentLength(bytes.length);

        //S3에 요청할 때 사용할 byteInputStream 생성
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

        try{
            //S3로 putObject 할 때 사용할 요청 객체
            //생성자 : bucket 이름, 파일 명, byteInputStream, metadata
            PutObjectRequest putObjectRequest =
                    new PutObjectRequest(filePath, s3FileName, byteArrayInputStream, metadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead);

            //실제로 S3에 이미지 데이터를 넣는 부분이다.
            amazonS3.putObject(putObjectRequest); // put image to S3
        }catch (Exception e){
            throw new ImageException(ImageErrorCode.IMAGE_UPLOAD_FAIL);
        }finally {
            byteArrayInputStream.close();
            is.close();
        }

        return amazonS3.getUrl(filePath, s3FileName).toString();
    }

    private String s3FilePath(String type){
        return bucket + "/" + serviceName + "/" + "images" + "/" + type;
    }





    public void delete() {

    }


    public void get(){

    }
}
