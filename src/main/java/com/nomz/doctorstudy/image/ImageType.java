package com.nomz.doctorstudy.image;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@RequiredArgsConstructor
@Slf4j
public enum ImageType {
    MEMBERS("members"), CONFERENCES("conferences"),
    MODERATORS("moderators"), GROUPS("groups")
    ;

    private final String domain;

    public static boolean contains(String type){
        for(ImageType element : ImageType.values()){
            if(element.getDomain().equalsIgnoreCase(type)){
                return true;
            }
        }

        return false;
    }

}
