package com.nomz.doctorstudy.studygroup.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudyGroupRequest {
    private String name;
    private Long imageId;
    private Long captainId;
    private String description;
    private String goal;
    private LocalDateTime dueDate;
    private int memberCapacity;
}
