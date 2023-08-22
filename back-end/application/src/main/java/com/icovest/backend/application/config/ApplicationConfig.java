package com.icovest.backend.application.config;

import com.github.javafaker.Faker;
import com.icovest.backend.userfeature.entity.UserService;
import com.icovest.baseclass.enums.Roles;
import com.icovest.backend.userfeature.entity.User;
import com.icovest.backend.userfeature.entity.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Bean
    CommandLineRunner commandLineRunner(@Autowired Faker faker){
        return args ->{
            log.info("Application started");
            User swa = User.builder()
                    .inviteCode(userService.createInviteCode())
                    .roles(Arrays.asList(Roles.BASIC_ACCESS, Roles.CLIENT_ACCESS))
                    .username("client")
                    .email("client@yopmail.com")
                    .isEnabled(true)
                    .password(passwordEncoder.encode("password"))
                    .build();
            log.info("User: {}", userRepository.save(swa));

            swa = User.builder()
                    .inviteCode(userService.createInviteCode())
                    .roles(Arrays.asList(Roles.BASIC_ACCESS, Roles.CLIENT_ACCESS, Roles.ADMIN_ACCESS, Roles.AGENT_ACCESS))
                    .username("admin1")
                    .email("admin1@yopmail.com")
                    .isEnabled(false)
                    .password(passwordEncoder.encode("password"))
                    .build();
            log.info("User: {}", userRepository.save(swa));

            for(int i = 0; i < 10; i++){
                User user = User.builder()
                        .inviteCode(userService.createInviteCode())
                        .roles(Arrays.asList(Roles.BASIC_ACCESS, Roles.CLIENT_ACCESS))
                        .username(faker.name().username())
                        .email(faker.internet().emailAddress())
                        .isEnabled(false)
                        .password(passwordEncoder.encode("Password123"))
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
