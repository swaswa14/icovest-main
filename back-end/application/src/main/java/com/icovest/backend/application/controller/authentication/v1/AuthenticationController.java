package com.icovest.backend.application.controller.authentication.v1;

import com.fasterxml.jackson.core.util.RequestPayload;
import com.icovest.authenticationfeature.service.AuthenticationService;
import com.icovest.backend.userfeature.entity.UserDto;
import com.icovest.backend.userfeature.requests.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Value("${app.config.CLIENT_PORT}")
    private String CLIENT_PORT;

    @Value("${app.config.HOST}")
    private String HOST;
    @PostMapping(value = "/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public Mono<UserDto> authenticate(@RequestBody LoginRequest request, HttpServletResponse response)  {
        log.info("Login Request {}", request);
        UserDto userDto = authenticationService.authenticate(request, response);

        return Mono.just(userDto);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<RegistrationResponse> register(@Valid @RequestBody RegistrationRequest request){
        log.info("Register Request {}", request);
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.register(request));
    }

    @GetMapping("/enable")
    @ResponseStatus(HttpStatus.OK)
    public String enableUser(@RequestParam String token, HttpServletResponse response) throws IOException {
        log.info("Enable User Request");
        AccountEnableResponse accountEnableResponse = authenticationService.enableUser(token);
        String redirectURL = String.format("/register?token=%s&expired?%s", accountEnableResponse.getToken(), accountEnableResponse.isExpired());

        response.setHeader("Location", redirectURL);
        response.setStatus(302);
        response.sendRedirect(redirectURL);
        return redirectURL;
    }

    @GetMapping("/reset")
    @ResponseStatus(HttpStatus.OK)
    public String resetPassword(@RequestParam String token, HttpServletResponse response) throws IOException {
        log.info("Reset Password Request");
        String redirectURL = String.format("/forgot?token=%s",  token);

        response.setHeader("Location", redirectURL);
        response.setStatus(302);
        response.sendRedirect(redirectURL);
        return redirectURL;
    }

    @GetMapping("/forgot-password")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CommonApiResponse> forgotPassword(@RequestParam String email){
        log.info("Forgot Password Request {}", email);

        return ResponseEntity.ok().body(authenticationService.forgotPassword(email));
    }

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CommonApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request){
        log.info("Change Password Request");
        return ResponseEntity.ok().body(authenticationService.changePassword(request));
    }


    @GetMapping(value = "/authenticated")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN_ACCESS', 'ROLE_CLIENT_ACCESS', 'ROLE_AGENT_ACCESS', 'ROLE_BASIC_ACCESS')")
    public Mono<UserDto> getAuthenticatedUser(HttpServletRequest request){
        log.info("Get Authenticated User Request");
        return Mono.just(authenticationService.getAuthenticatedUser(request));
    }


    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public String logout(HttpServletResponse response, HttpServletRequest request) throws IOException {
        log.info("Logout Request");


        return authenticationService.logoutUser(response, request);


    }

    @GetMapping(value = "/send-verification-email")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CommonApiResponse> resendVerificationEmail(@RequestParam String email) {
        // Your logic here
        return ResponseEntity.ok(authenticationService.resendVerificationEmail(email));
    }
}
