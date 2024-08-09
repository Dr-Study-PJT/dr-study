package com.nomz.doctorstudy.image;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@RequiredArgsConstructor
@Slf4j
public enum ImageFileType {
    JPG("jpg"), PNG("png"), JPEG("jpeg"),
    ;

    private final String extension;

    public static boolean contains(String type){
        for(ImageFileType element : ImageFileType.values()){
            if(element.getExtension().equalsIgnoreCase(type)){
                return true;
            }
        }

        return false;
    }
}
