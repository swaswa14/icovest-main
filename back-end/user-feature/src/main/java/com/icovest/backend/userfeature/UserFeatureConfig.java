package com.icovest.backend.userfeature;

import com.icovest.baseclass.BaseClassConfig;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;


@ComponentScan
@SpringBootConfiguration
@EnableAutoConfiguration
@Import({BaseClassConfig.class})
public class UserFeatureConfig {
}
