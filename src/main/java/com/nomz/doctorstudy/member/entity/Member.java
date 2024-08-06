package com.nomz.doctorstudy.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nomz.doctorstudy.image.entity.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@EqualsAndHashCode
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
    private LocalDateTime regDate;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @ColumnDefault("0")
    private boolean isLeaved;

    private LocalDateTime leavedDate;

    @Builder
    public Member(String email, String password, String nickname, Image image, LocalDateTime regDate, LocalDateTime leavedDate, boolean isLeaved){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
        this.regDate = regDate;
        this.leavedDate = leavedDate;
        this.isLeaved = isLeaved;
    }

    public Image getImage() {
        if (image == null) {
            return Image.builder()
                    .imageUrl("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg")
                    .isDeleted(false)
                    .createdAt(LocalDateTime.now())
                    .build();
        }

        return image;
    }

    public void update(String password){
        this.password = password;
    }
}

