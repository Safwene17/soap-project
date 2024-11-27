package com.example.Backend.spring_angular.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints that do not require authentication
                        .requestMatchers("/api/employees/login").permitAll()
                        .requestMatchers("/api/employees/register").permitAll()
                        .requestMatchers("/api/employees/getall").permitAll()

                        // Endpoints accessible to authenticated users only
                        .requestMatchers("/api/employees/get/**").permitAll()
                        .requestMatchers("/api/employees/update/**").permitAll()
                        .requestMatchers("/api/employees/delete/**").permitAll()
                        .requestMatchers("/api/employees/email/**").permitAll()

                        // Protect all other endpoints
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class); // Add JWT filter

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Allow Angular frontend
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow common HTTP methods
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "multipart/form-data")); // Allow headers
        configuration.setExposedHeaders(Arrays.asList("Authorization")); // Expose Authorization header
        configuration.setAllowCredentials(true); // Allow credentials
        configuration.setMaxAge(3600L); // Set max age for CORS preflight requests

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
