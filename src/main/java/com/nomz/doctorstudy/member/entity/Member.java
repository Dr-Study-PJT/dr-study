package com.nomz.doctorstudy.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(value = {AuditingEntityListener.class})
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@NotBlank(message = "이메일을 잘 입력해주세요")
    @Email
    private String email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "패스워드를 잘 입력해주세요")
    private String password;

    @NotBlank(message = "닉네임을 잘 입력해주세요")
    private String nickname;

    @CreatedDate
//    @Column(updatable = false, nullable = false)
    private LocalDateTime reg_date;

    private long image_id;

    @ColumnDefault("0")
    private boolean is_leaved;
    private LocalDateTime leaved_date;

    @Builder
    public Member(String email, String password, String nickname, long imageId, LocalDateTime regDate, LocalDateTime leavedDate, boolean isLeaved){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.image_id = imageId;
        this.reg_date = regDate;
        this.leaved_date = leavedDate;
        this.is_leaved = isLeaved;
    }


    public void update(String password){
        this.password = password;
    }
}

