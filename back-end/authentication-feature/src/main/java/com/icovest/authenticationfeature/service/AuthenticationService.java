package com.icovest.authenticationfeature.service;

import com.icovest.baseclass.enums.ApiResponseStatus;
import com.icovest.baseclass.enums.Roles;
import com.icovest.backend.userfeature.entity.*;
import com.icovest.backend.userfeature.entity.token.TokenService;
import com.icovest.backend.userfeature.entity.token.TokenType;
import com.icovest.backend.userfeature.entity.token.UserToken;
import com.icovest.backend.userfeature.requests.*;
import com.icovest.baseclass.errors.*;
import com.icovest.emailfeature.EmailFeatureService;
import io.jsonwebtoken.Claims;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final EmailFeatureService emailFeatureService;
    private final TokenService tokenService;
    private final JwtService jwtService;
    private final UserMapperService userMapperService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;



    public RegistrationResponse register(@Valid RegistrationRequest request) {
        log.info("Registering user: {}", request);

        final String email = request.getEmail().toLowerCase();
        final String password = request.getPassword();
        final String username = request.getUsername().toLowerCase();

        final String invitationCode = request.getInvitationCode();

        final String encodedPassword = passwordEncoder.encode(password);


        //Check if user exists
        if (userRepository.existsUserByEmail(email)) {
            throw new DuplicateEmailException();
        } else if (userRepository.existsUserByUsername(username)) {
            throw new DuplicateUsernameException();
        } else if (invitationCode!= null && !userRepository.existsUserByInviteCode(invitationCode) && invitationCode.length() == 6) {
            throw new InviteCodeDoesNotExistsException();
        }


        List<Roles> roles = List.of(Roles.CLIENT_ACCESS, Roles.BASIC_ACCESS);
        //Create user
        User user = User.builder()
                .email(email)
                .password(encodedPassword)
                .username(username)
                .inviteCode(userService.createInviteCode())
                .usdt(Usdt.builder()
                        .balance(BigDecimal.valueOf(0.00))
                        .build())
                .roles(roles)
                .invitedBy(invitationCode)
                .isEnabled(false)
                .build();

        UserDto userDto = userService.saveUser(user);

        //checking if it has been saved in the repository
        if (userDto.id() != null && userRepository.existsUserByEmail(email) && userRepository.existsUserByUsername(username)) {
            log.info("User saved successfully");
            User registeredUser = userRepository.findById(userDto.id()).orElseThrow(AccountDoesNotExistsException::new);
            try {

//                UserToken userToken = tokenService.userTokenBuilder(registeredUser, TokenType.Enabled_Account, 1, 0, 0);
//                emailFeatureService.sendEmailEnableAccount(userToken.getToken(), registeredUser.getEmail(), userToken.getExpiryDate());
                  String token = jwtService.generateToken(registeredUser);

                    emailFeatureService.sendEmailEnableAccount(token, registeredUser.getEmail(), jwtService.extractExpiration(token));
                return RegistrationResponse.builder()
                        .header("Registration Status")
                        .body(email)
                        .footer("Thank you for registering with us")
                        .build();
            } catch (MessagingException e) {
                throw new EmailErrorException(registeredUser.getEmail());
            }
        } else {
            throw new UserRegistrationErrorException();
        }

    }

    public UserDto authenticate(LoginRequest request, HttpServletResponse response) {
        log.info("Authenticating user: {}", request);

        final String usernameOrEmail = request.getUser().toLowerCase();
        final String password = request.getPass();

        User user = userService.findUserByUsernameOrEmail(usernameOrEmail);

        try {
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            password
                    ));

            log.info("Authentication: {}", authentication);

            if(authentication.isAuthenticated()){

                String jwtToken = jwtService.generateToken(user);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                Cookie jwtCookie = new Cookie("jwt", jwtToken);
                jwtCookie.setHttpOnly(true);
                jwtCookie.setPath("/");
                jwtCookie.setMaxAge(3600);
                response.addCookie(jwtCookie);

                log.info("Authenticated user {}", user);
                return userMapperService.apply(user);
            }else {
                throw new BadCredentialsException("Invalid Credentials");
            }
        }catch (BadCredentialsException   | AccountDoesNotExistsException ex){
            log.info("Invalid Credentials {}", ex.getMessage());
            throw new InvalidCredentialsException();
        }
        catch (DisabledException e) {
            log.info("User is disabled {}", e.getMessage());
            throw new AccountNotEnabledException();
        }
        catch (Exception e){
            log.info("Exception {}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }

    }

    public AccountEnableResponse enableUser(String token) {
//        UserToken userToken = tokenService.findUserTokenByToken(token);
//        User user = userToken.getUser();
//        user.setEnabled(true);
//        userService.saveUser(user);
        String username = jwtService.extractUsername(token);
        boolean isTokenValid = jwtService.isTokenValid(token, userService.loadUserByUsername(username));


        User user = userService.findUserByUsernameOrEmail(username);
        user.setEnabled(isTokenValid);
        user = userRepository.saveAndFlush(user);
        return AccountEnableResponse.builder()
                .token(token)
                .expired(isTokenValid)
                .build();

    }

    public CommonApiResponse forgotPassword(String email) {
        log.info("Forgot Password Request {}", email);
        try {
            User user = userService.findUserByUsernameOrEmail(email);
            String token = jwtService.generateToken(user);
            emailFeatureService.sendCodeToForgotPassword(user.getEmail(), token);

            return CommonApiResponse.builder()
                    .status(ApiResponseStatus.SUCCESS)
                    .message("An email has been sent to your email address to reset your password")
                    .build();
        } catch (MessagingException e) {
            throw new EmailErrorException(email);
        }
    }

    public CommonApiResponse changePassword (ChangePasswordRequest request){
        String username = jwtService.extractUsername(request.getToken());
        User user = userService.findUserByUsernameOrEmail(username);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userService.saveUser(user);
        try {
            emailFeatureService.sendGenericEmail(user.getEmail(), "Password Changed", String.format("%s\n%s","Your password has been changed on: ", new Date()), "Change Password Request");
            return CommonApiResponse.builder()
                    .status(ApiResponseStatus.SUCCESS)
                    .message("Your password has been changed successfully")
                    .build();
        } catch (MessagingException e) {
            throw new EmailErrorException(user.getEmail());
        }
    }

    public UserDto getAuthenticatedUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {

                if (cookie.getName().equals("jwt")) {
                    String jwt = cookie.getValue();
                    String username = jwtService.extractUsername(jwt);
                    log.info("-----------------------");
                    log.info("username " + username);
                    log.info("Cookie name " + cookie.getName());
                    log.info("Cookie value " + cookie.getValue());
                    log.info("-----------------------");
                    User user = userService.findUserByUsernameOrEmail(username);

                    log.info("Authenticated User {}", user);

                    return userMapperService.apply(user);

                }
            }
        }else{
            return null;
        }

        return null;
    }

    public CommonApiResponse resendVerificationEmail(String email) {
        User user = userService.findUserByUsernameOrEmail(email);
        try {
            String jwtToken = jwtService.generateToken(user);

            emailFeatureService.sendEmailEnableAccount(jwtToken, user.getEmail(), new Date());
            return CommonApiResponse.builder()
                    .status(ApiResponseStatus.SUCCESS)
                    .message("Verification Email Sent")
                    .build();
        } catch (MessagingException e) {
            throw new EmailErrorException(user.getEmail());
        }
    }

    public String logoutUser(HttpServletResponse response, HttpServletRequest request) throws IOException {
        Cookie[] cookies = request.getCookies();

        if (cookies == null || Arrays.stream(cookies).noneMatch(cookie -> cookie.getName().equals("jwt"))) {
            return "/login";
        }
        else {
            for (Cookie cookie : cookies) {
                log.info("Cookie name " + cookie.getName());
                log.info("Cookie value " + cookie.getValue());
                if (cookie.getName().equals("jwt")) {
                    jwtService.extractClaim(cookie.getValue(), (Function<Claims, Void>) claims -> {
                        claims.setExpiration(new Date(System.currentTimeMillis() - 1000));
                        return null;
                    });
                    cookie.setValue(null);// Make sure to replace "cookieName" with the name of your actual
                    // cookie
                    cookie.setMaxAge(0);
                    cookie.setPath("/"); // This is important to make sure the cookie gets deleted for all paths
                    response.addCookie(cookie);
                    String redirectURL = "/login";
                    response.setHeader("Location", redirectURL);
                    response.setStatus(303);
                    response.sendRedirect(redirectURL);

                    return redirectURL;


                }
            }
        }
        return null;
        }
}
