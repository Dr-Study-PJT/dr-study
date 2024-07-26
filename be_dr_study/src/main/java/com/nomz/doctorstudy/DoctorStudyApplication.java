package com.nomz.doctorstudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class DoctorStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoctorStudyApplication.class, args);
	}

}
