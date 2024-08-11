package com.nomz.doctorstudy.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nomz.doctorstudy.image.ImageFileType;
import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.exception.FileException;
import com.nomz.doctorstudy.image.request.SaveS3MediaRequest;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {

    private final AmazonS3 amazonS3;

    public String save(SaveS3MediaRequest saveS3MediaRequest) throws IOException {
        MultipartFile file = saveS3MediaRequest.getFile();
        String filePath = saveS3MediaRequest.getFilePath();

        String originalFilename = file.getOriginalFilename(); //원본 파일 명
        log.info("originalFileName = {}", originalFilename);

        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1); //확장자 명
        log.info("extension = {}", extension);

        String s3FileName = "";
        if(!ImageFileType.contains(extension)) {
            log.info("!ImageType");
            s3FileName = originalFilename;
        } else {
            log.info("ImageType");
            s3FileName = UUID.randomUUID().toString() + "." + extension; //변경된 파일 명
        }


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

    public String save(File file, String filePath) throws IOException {
//        File file = saveS3MediaRequest.getFile();
//        String filePath = saveS3MediaRequest.getFilePath();

        String originalFilename = file.getName(); //원본 파일 명
        log.info("originalFileName = {}", originalFilename);

        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1); //확장자 명
        log.info("extension = {}", extension);


        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.length());
        objectMetadata.setContentType("audio/mpeg");


        try(InputStream inputStream = new FileInputStream(file)){
            amazonS3.putObject(
                    new PutObjectRequest(filePath, originalFilename, inputStream, objectMetadata)
            );

        }catch (IOException e){
            throw new FileException(FileErrorCode.IMAGE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(filePath, originalFilename).toString();
    }

}
