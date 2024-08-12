package com.nomz.doctorstudy.config;

import com.nomz.doctorstudy.member.LoginToken;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Configuration
public class SwaggerConfig {
    @Value("${auth.use-dev-token}")
    private boolean useDevToken = false;

    @Bean
    @Profile("!local")
    public OpenAPI openAPI(ServletContext servletContext) {
        return getOpenAPI(servletContext);
    }

    @Bean
    @Profile("local")
    public OpenAPI localOpenAPI(ServletContext servletContext) {
        if (useDevToken) {
            return getDevTokenOpenAPI(servletContext);
        }
        else {
            return getOpenAPI(servletContext);
        }
    }

    private OpenAPI getOpenAPI(ServletContext servletContext) {
        Info info = new Info()
                .version("v1.0")
                .title("Doctor Study API")
                .description("닥터 스터디 프로젝트 API");

        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER).name("Authorization");
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

        Server server = new Server()
                .url(servletContext.getContextPath());

        return new OpenAPI()
                .info(info)
                .components(new Components().addSecuritySchemes("bearerAuth", securityScheme))
                .security(List.of(securityRequirement))
                .servers(List.of(server));
    }

    private OpenAPI getDevTokenOpenAPI(ServletContext servletContext) {
        Info info = new Info()
                .version("v1.0")
                .title("Doctor Study API")
                .description("닥터 스터디 프로젝트 API");

        SecurityScheme devMemberIdScheme = new SecurityScheme()
                .type(SecurityScheme.Type.APIKEY)
                .in(SecurityScheme.In.HEADER)
                .name(LoginToken.DEV_LOGIN_TOKEN)
                .scheme("bearer"); // API Key 스키마로 설정

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList(LoginToken.DEV_LOGIN_TOKEN);

        Server server = new Server()
                .url(servletContext.getContextPath());

        return new OpenAPI()
                .info(info)
                .components(new Components().addSecuritySchemes(LoginToken.DEV_LOGIN_TOKEN, devMemberIdScheme))
                .security(List.of(securityRequirement))
                .servers(List.of(server));
    }
}
