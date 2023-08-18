package com.icovest.backend.application.controller;

import com.icovest.authenticationfeature.service.AuthenticationService;
import com.icovest.backend.userfeature.entity.UserDto;
import com.icovest.backend.userfeature.requests.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

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
    public Mono<RegistrationResponse> enableUser(@RequestParam String token){
        log.info("Enable User Request");
        return Mono.just(authenticationService.enableUser(token));
    }

    @PostMapping("/forgot-password")
    @ResponseStatus(HttpStatus.OK)
    public Mono<ForgotPasswordResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request){
        log.info("Forgot Password Request");
        return Mono.just(authenticationService.forgotPassword(request));
    }

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.OK)
    public Mono<ChangePasswordResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request){
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
}
