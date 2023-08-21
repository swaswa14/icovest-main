package com.icovest.backend.application.controller;

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
    public ResponseEntity<Mono<AuthenticationResponse>> authenticate(@Valid @RequestBody LoginRequest request, HttpServletResponse response)  {
        log.info("Login Request {}", request);
        return ResponseEntity.ok(Mono.just(authenticationService.authenticate(request, response)));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Mono<RegistrationResponse>> register(@Valid @RequestBody RegistrationRequest request){
        log.info("Register Request {}", request);
        return ResponseEntity.ok(Mono.just(authenticationService.register(request)));
    }

    @GetMapping("/enable")
    @ResponseStatus(HttpStatus.OK)
    public String enableUser(@RequestParam String token, HttpServletResponse response) throws IOException {
        log.info("Enable User Request");
        AccountEnableResponse accountEnableResponse = authenticationService.enableUser(token);
        String redirectURL = String.format("http://%s:%s/register?token=%s&expired?%s",HOST, CLIENT_PORT, accountEnableResponse.getToken(), accountEnableResponse.isExpired());


        response.setHeader("Location", redirectURL);
        response.setStatus(302);
        response.sendRedirect(redirectURL);
        return redirectURL;
    }

    @GetMapping("/reset")
    @ResponseStatus(HttpStatus.OK)
    public String resetPassword(@RequestParam String token, HttpServletResponse response) throws IOException {
        log.info("Reset Password Request");
        String redirectURL = String.format("http://%s:%s/forgot?token=%s", HOST, CLIENT_PORT, token);

        response.setHeader("Location", redirectURL);
        response.setStatus(302);
        response.sendRedirect(redirectURL);
        return redirectURL;
    }

    @GetMapping("/forgot-password")
    @ResponseStatus(HttpStatus.OK)
    public Mono<CommonApiResponse> forgotPassword(@RequestParam String email){
        log.info("Forgot Password Request {}", email);

        return Mono.just(authenticationService.forgotPassword(email));
    }

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.OK)
    public Mono<CommonApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request){
        log.info("Change Password Request");
        return Mono.just(authenticationService.changePassword(request));
    }


    @GetMapping(value = "/authenticated")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN_ACCESS', 'ROLE_CLIENT_ACCESS', 'ROLE_AGENT_ACCESS', 'ROLE_BASIC_ACCESS')")
    public ResponseEntity<Mono<UserDto>> getAuthenticatedUser(HttpServletRequest request){
        log.info("Get Authenticated User Request");
        return ResponseEntity.ok(Mono.just(authenticationService.getAuthenticatedUser(request)));
    }


    @GetMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> logout(HttpServletResponse response) {
        log.info("Logout Request");
        Cookie cookie = new Cookie("jwt", null); // Make sure to replace "cookieName" with the name of your actual
        // cookie
        cookie.setMaxAge(0);
        cookie.setPath("/"); // This is important to make sure the cookie gets deleted for all paths
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK).body("User logged out and cookie deleted");
    }

    @GetMapping(value = "/send-verification-email")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Mono<CommonApiResponse>> resendVerificationEmail(@RequestParam String email) {
        // Your logic here
        return ResponseEntity.ok(Mono.just(authenticationService.resendVerificationEmail(email)));
    }
}
