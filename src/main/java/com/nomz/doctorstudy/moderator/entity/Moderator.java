package com.nomz.doctorstudy.moderator.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
