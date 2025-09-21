package com.system.hr.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.system.hr.security.CustomUserDetailsService;
import com.system.hr.security.JwtAuthenticationFilter;


@Configuration
@EnableMethodSecurity 
public class SecurityConfig {
	
	
	 @Autowired
	    private JwtAuthenticationFilter jwtAuthenticationFilter;
	 
	 @Autowired
	    private CustomUserDetailsService customUserDetailsService;
	

	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		 
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

  
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
	  @Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	            http.cors(cors -> {})  
	                .csrf(csrf -> csrf.disable())
	                .authorizeHttpRequests(auth -> auth
	                        .requestMatchers("/api/auth/**").permitAll()  
//	                        .requestMatchers(HttpMethod.DELETE,"/api/candidates/").hasAuthority("Role_Admin") 
//	                        .requestMatchers(HttpMethod.DELETE,"/api/jobs/**").hasAuthority("Role_Admin") 
//	                        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
	                        .anyRequest().authenticated()
	                )
	                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  
	                .authenticationProvider(authenticationProvider())
	                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

	        return http.build();
	    }

}

