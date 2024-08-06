package com.nomz.doctorstudy.image;

import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.exception.FileException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@RequiredArgsConstructor
@Slf4j
public enum MediaType {
    JPG("jpg"), PNG("png"), JPEG("jpeg"),
    MP3("mp3"), MP4("mp4");

    private final String extension;

    public static MediaType fromExtension(String extension){
        for(MediaType mediaType : values()){
            if(mediaType.extension.equalsIgnoreCase(extension))
                return mediaType;
        }

        log.info("지원하지 않는 미디어 타입인데여??");
        throw new FileException(FileErrorCode.NO_ACCESS_FILE_EXTENSION);
    }

}
