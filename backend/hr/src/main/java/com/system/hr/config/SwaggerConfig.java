package com.system.hr.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("HR System Api's") // 👈 change heading here
                        .version("2.0.1")                  // 👈 API version
                        .description("This is the updated API documentation heading")); // 👈 subtitle
    }
}
