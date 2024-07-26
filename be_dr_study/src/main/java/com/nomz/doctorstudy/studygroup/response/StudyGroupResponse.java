package com.nomz.doctorstudy.studygroup.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StudyGroupResponse {
    private Long id;
    private String name;
    private Long imageId;
    private Long captainId;
    private LocalDateTime createdAt;
    private boolean isDeleted;
    private String description;
    private String goal;
    private LocalDateTime dueDate;
    private int memberCount;
    private int memberCapacity;
}
