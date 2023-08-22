package com.icovest.authenticationfeature;


import com.icovest.backend.userfeature.UserFeatureConfig;
import com.icovest.backend.userfeature.entity.User;
import com.icovest.backend.userfeature.entity.UserRepository;
import com.icovest.backend.userfeature.entity.UserService;
import com.icovest.baseclass.BaseClassConfig;
import com.icovest.baseclass.errors.AccountDoesNotExistsException;
import com.icovest.emailfeature.EmailFeatureConfiguration;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
@Import({UserFeatureConfig.class, EmailFeatureConfiguration.class, BaseClassConfig.class})
@RequiredArgsConstructor
public class AuthenticationFeatureConfig {

    private final UserService userService;
    private final UserRepository repository;
    @Bean
    public UserDetailsService userDetailsService(){
        return username -> {
            // First, try to find the user by their username
            Optional<User> userByUsername = repository.findUserByUsername(username);

            // If a user is found by their username, return it
            if (userByUsername.isPresent()) {
                return userByUsername.get();
            }

            // If not, try to find the user by their email
            Optional<User> userByEmail = repository.findUserByEmail(username);

            // If a user is found by their email, return it
            if (userByEmail.isPresent()) {
                return userByEmail.get();
            }

            // If no user is found by either their username or email, throw an exception
            throw new AccountDoesNotExistsException();
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
