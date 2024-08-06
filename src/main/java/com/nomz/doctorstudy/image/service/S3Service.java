package com.nomz.doctorstudy.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.exception.FileException;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.image.response.UploadS3Response;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

    private final AmazonS3 amazonS3;

    public String save(MultipartFile file, String filePath) throws IOException {
        String originalFilename = file.getOriginalFilename(); //원본 파일 명
//        String extention = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명

        String s3FileName = UUID.randomUUID().toString(); //변경된 파일 명

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());



        try(InputStream inputStream = file.getInputStream()){
            amazonS3.putObject(
                    new PutObjectRequest(filePath, s3FileName, inputStream, objectMetadata)
            );

        }catch (IOException e){
            throw new FileException(FileErrorCode.IMAGE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(filePath, s3FileName).toString();
    }

}
