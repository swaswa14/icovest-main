package com.icovest.backend.application;

import com.icovest.authenticationfeature.AuthenticationFeatureConfig;
import com.icovest.backend.userfeature.UserFeatureConfig;
import com.icovest.baseclass.BaseClassConfig;
import com.icovest.emailfeature.EmailFeatureConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({UserFeatureConfig.class, EmailFeatureConfiguration.class, AuthenticationFeatureConfig.class, BaseClassConfig.class})
public class  BackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndApplication.class, args);
    }
}
