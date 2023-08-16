package com.icovest.authenticationfeature;

import com.icovest.authenticationfeature.service.AuthenticationService;
import com.icovest.backend.errors.AccountNotEnabledException;
import com.icovest.backend.userfeature.requests.AuthenticationResponse;
import com.icovest.backend.userfeature.requests.LoginRequest;
import com.icovest.backend.userfeature.requests.RegistrationRequest;
import com.icovest.backend.userfeature.requests.RegistrationResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

@SpringBootTest
public class AuthenticationFeatureTest {

    @Autowired
    private AuthenticationService authenticationService;

    @Test
    void testNotNull(){
        assert(authenticationService != null);
    }


    @Test
    void testRegister(){
        RegistrationRequest request = RegistrationRequest.builder()
                .email("swaswa14@yopmail.com")
                .username("swaswa14")
                .password("Superswa123..")
                .invitationCode("")
                .build();

        Assertions.assertDoesNotThrow(()->{
            RegistrationResponse response = authenticationService.register(request);
            assert(response != null);
            System.out.println(response.getBody());
            System.out.println(response.getHeader());

        });

    }


    @Test
    void authenticate(){
        RegistrationRequest request = RegistrationRequest.builder()
                .email("swaswa123@yopmail.com")
                .username("swaswa123")
                .password("Superswa123..")
                .invitationCode("")
                .build();

        Assertions.assertDoesNotThrow(()->{
            RegistrationResponse response = authenticationService.register(request);
            assert(response != null);
            System.out.println(response.getBody());
            System.out.println(response.getHeader());

        });

        LoginRequest loginRequest = LoginRequest.builder()
                        .usernameOrEmail("swaswa123")
                                .password("Superswa123..")
                                        .build();
        MockHttpServletResponse mockResponse = new MockHttpServletResponse();
        Assertions.assertThrows(AccountNotEnabledException.class, ()->{
            AuthenticationResponse response = authenticationService.authenticate(loginRequest, mockResponse);
            assert(response != null);
            
        });

    }
}
