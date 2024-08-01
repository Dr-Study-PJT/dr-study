package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    private Member host;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer memberCapacity;

    @Column
    private Long imageId;

    @Column
    private Boolean isFinished;

    @Column
    private LocalDateTime startTime;

    @Column
    private LocalDateTime finishTime;
}