package com.icovest.backend.application.config;

import com.github.javafaker.Faker;
import com.icovest.backend.enums.Roles;
import com.icovest.backend.userfeature.entity.User;
import com.icovest.backend.userfeature.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationConfig {

    private final UserRepository userRepository;

    @Bean
    CommandLineRunner commandLineRunner(@Autowired Faker faker){
        return args ->{
            log.info("Application started");

            for(int i = 0; i < 10; i++){
                User user = User.builder()
                        .inviteCode(UUID.randomUUID().toString())
                        .roles(Arrays.asList(Roles.BASIC_ACCESS, Roles.CLIENT_ACCESS))
                        .build();
                log.info("User: {}", userRepository.save(user));
            }
        };
    }

    @Bean
    public Faker faker(){
        return new Faker();
    }
}
