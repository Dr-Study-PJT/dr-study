
package com.nomz.doctorstudy.image;

import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

// defualt image를 등록하기 위한 클래스입니다.

@Configuration
public class DefaultImageDataLoader {

    @Bean
    public CommandLineRunner loadData(ImageRepository repository) {
        return (args) -> {
            Image image = Image.builder()
                    .imageUrl("https://mz-stop.s3.ap-northeast-2.amazonaws.com/dog.jpg")
                    .createdAt(LocalDateTime.now())
                    .build();

            repository.save(image);
        };
    }

}
