package com.nomz.doctorstudy.config;

import org.springframework.boot.task.ThreadPoolTaskExecutorBuilder;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.time.Duration;
import java.util.concurrent.Executor;

@EnableAsync
@Configuration
public class AsyncConfig implements AsyncConfigurer {
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutorBuilder()
                .corePoolSize(5)
                .maxPoolSize(5)
                .queueCapacity(5)
                .keepAlive(Duration.ofSeconds(30))
                .threadNamePrefix("aasync-executor-")
                .build();
        executor.initialize();
        return executor;
    }
}
