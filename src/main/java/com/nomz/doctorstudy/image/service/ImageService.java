//package com.nomz.doctorstudy.image.service;
//
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import com.nomz.doctorstudy.image.entity.Image;
//import com.nomz.doctorstudy.image.exception.FileErrorCode;
//import com.nomz.doctorstudy.image.exception.FileException;
//import com.nomz.doctorstudy.image.repository.ImageRepository;
//import com.nomz.doctorstudy.image.request.S3UploadRequest;
//import com.nomz.doctorstudy.image.response.UploadS3Response;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.*;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class ImageService{
//
//    private final ImageRepository imageRepository;
//
//    private final AmazonS3 amazonS3;
//    private final String serviceName = "dr-study";
//
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    @Transactional
//    public UploadS3Response save(S3UploadRequest s3UploadRequest) {
//        MultipartFile image = s3UploadRequest.getFile();
//        String type = s3UploadRequest.getType();
//
//        validateImageFile(image);
//
//        try{
//            String s3Url = uploadImageS3(image, type);
//            log.info("service s3URL = {}", s3Url);
//            Image uploadImage = Image.builder()
//                    .imageUrl(s3Url)
//                    .build();
//
//            Image saveImage = imageRepository.save(uploadImage);
//
//            UploadS3Response uploadS3Response = UploadS3Response
//                    .builder()
//                    .imageId(saveImage.getId())
//                    .imageUrl(saveImage.getImageUrl())
//                    .build();
//
//            log.info("save Id = {}", saveImage.getId());
//            log.info("save url = {}", saveImage.getImageUrl());
//
//            return uploadS3Response;
//
////            return uploadImageS3(image, type);
//        } catch(IOException e){
//            throw new FileException(FileErrorCode.IMAGE_UPLOAD_FAIL);
//        }
//
//    }
//
//    private void validateImageFile(MultipartFile image){
//        if(image.isEmpty() || Objects.isNull(image.getOriginalFilename())){
//            throw new FileException(FileErrorCode.IMAGE_NOT_FOUND);
//        }
//
//        validateImageFileExtention(image.getOriginalFilename());
//    }
//
//    private void validateImageFileExtention(String filename){
//        int lastDotIndex = filename.lastIndexOf(".");
//
//        if(lastDotIndex == -1){
//            throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
//        }
//
//        String extention = filename.substring(lastDotIndex + 1).toLowerCase();
//        List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");
//
//        if (!allowedExtentionList.contains(extention)) {
//            log.info("지원하지 않는 확장자입니다.");
//            throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
//        }
//
//    }
//
//
//    private String uploadImageS3(MultipartFile image, String type) throws IOException{
//        String originalFilename = image.getOriginalFilename(); //원본 파일 명
////        String extention = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명
//
//        String filePath = s3FilePath(type);
//        String s3FileName = UUID.randomUUID().toString() + originalFilename; //변경된 파일 명
//
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentLength(image.getSize());
//        objectMetadata.setContentType(image.getContentType());
//
//
//
//        try(InputStream inputStream = image.getInputStream()){
//            amazonS3.putObject(
//                    new PutObjectRequest(filePath, s3FileName, inputStream, objectMetadata)
//            );
//
//        }catch (IOException e){
//            throw new FileException(FileErrorCode.IMAGE_UPLOAD_FAIL);
//        }
//
//        return amazonS3.getUrl(filePath, s3FileName).toString();
//    }
//
//
//    private String s3FilePath(String type){
//        return bucket + "/" + serviceName + "/" + "images" + "/" + type;
//    }
//
//
//
//    public void delete() {
//
//    }
//
//
//    public String get(Long id){
//
//        Image image = imageRepository.findById(id)
//                .orElseThrow(() -> new FileException(FileErrorCode.IMAGE_DOWNLOAD_FAIL));
//
//        return image.getImageUrl();
//    }
//
//    private boolean checkType(String type){
//        final String[] typeList = {"members", "conferences", "avatars", "groups"};
//
//        return Arrays.asList(typeList).contains(type);
//    }
//
//
//}
