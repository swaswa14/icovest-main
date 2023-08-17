package com.icovest.backend.application.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {


    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;


    private final String[] publicEndPoint = {"/api/v1/auth/logout", "/api/v1/auth/authenticate", "/api/v1/auth/register", "/api/v1/auth/forgot-password",
    "/api/v1/auth/change-password", "/api/v1/auth/enable"
    };
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

                .csrf(csrf -> csrf.disable())
//                .exceptionHandling(exception -> exception.authenticationEntryPoint(globalExceptionHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(publicEndPoint).permitAll()
////                        .requestMatchers(superAdminEndPoint).hasAuthority("Admin")
////                        .requestMatchers(agentEndpoint).hasAuthority("Agent")
////                        .requestMatchers(clientEndPoint).hasAuthority("Client")
//                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(roleBasedAuthFilter, JwtAuthFilter.class)
                .authenticationProvider(authenticationProvider);

        return http.build();
    }
}
