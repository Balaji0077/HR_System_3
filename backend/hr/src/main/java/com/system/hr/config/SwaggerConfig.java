package com.system.hr.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
    	
    	  final String securitySchemeName = "bearerAuth";
    	  
        return new OpenAPI()
                .info(new Info()
                        .title("HR System Api's")
                        .version("2.0.1")                
                        .description("This is the updated API documentation heading"))
                 .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                  .components(new Components()
                  .addSecuritySchemes(securitySchemeName,
                        new SecurityScheme()
                                .name(securitySchemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}
