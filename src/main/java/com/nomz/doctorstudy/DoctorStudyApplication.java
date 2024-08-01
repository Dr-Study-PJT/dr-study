package com.nomz.doctorstudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DoctorStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoctorStudyApplication.class, args);
	}

}
