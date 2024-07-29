package com.nomz.doctorstudy.moderator.entity;

import com.nomz.doctorstudy.moderator.Avatar;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Moderator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "processor_id")
    private Processor processor;

    @ManyToOne
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;
}
