package com.nomz.doctorstudy.config;


import com.nomz.doctorstudy.common.jwt.JwtUtil;
import com.nomz.doctorstudy.member.LoginMemberArgumentResolver;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final LoginMemberArgumentResolver loginMemberArgumentResolver;


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // configuration.addAllowedOrigin("*");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader(jwtUtil.HEADER_STRING);
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    		registry.addResourceHandler("/resources/**")
    				.addResourceLocations("/WEB-INF/resources/");
    		
    		registry.addResourceHandler("swagger-ui.html")
    				.addResourceLocations("classpath:/META-INF/resources/");

    		registry.addResourceHandler("/webjars/**")
    				.addResourceLocations("classpath:/META-INF/resources/webjars/");
    		
    		/*
    		 * 
    		 * Front-end에서 참조하는 URL을 /dist로 매핑
    		 * 
    		 */
        registry.addResourceHandler("/css/**")
        			.addResourceLocations("classpath:/dist/css/");
        	registry.addResourceHandler("/fonts/**")
        			.addResourceLocations("classpath:/dist/fonts/");
        registry.addResourceHandler("/icons/**")
				.addResourceLocations("classpath:/dist/icons/");
        registry.addResourceHandler("/img/**")
			.addResourceLocations("classpath:/dist/img/");
        registry.addResourceHandler("/js/**")
				.addResourceLocations("classpath:/dist/js/");
    }

    public Filter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setIncludeHeaders(true);
        loggingFilter.setMaxPayloadLength(64000);

        return loggingFilter;
    }


    @Bean
    public FilterRegistrationBean loggingFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean(requestLoggingFilter());
        registration.addUrlPatterns("/api/*");
        return registration;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginMemberArgumentResolver);
    }
}
