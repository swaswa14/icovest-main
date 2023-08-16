package com.icovest.authenticationfeature.service;

import com.icovest.baseclass.enums.Roles;
import com.icovest.backend.userfeature.entity.*;
import com.icovest.backend.userfeature.entity.token.TokenService;
import com.icovest.backend.userfeature.entity.token.TokenType;
import com.icovest.backend.userfeature.entity.token.UserToken;
import com.icovest.backend.userfeature.requests.*;
import com.icovest.baseclass.errors.*;
import com.icovest.emailfeature.EmailFeatureService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

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

    public RegistrationResponse register(RegistrationRequest request) {
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
        } else if (!userRepository.existsUserByInviteCode(invitationCode) && invitationCode.length() == 6) {
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
                UserToken userToken = tokenService.userTokenBuilder(registeredUser, TokenType.Enabled_Account, 1, 0, 0);
                emailFeatureService.sendEmailEnableAccount(userToken.getToken(), registeredUser.getEmail(), userToken.getExpiryDate());

                return RegistrationResponse.builder()
                        .header("Registration Status")
                        .body("An email has been sent to " + email + " . Please click on the link to activate your account.")
                        .footer("Thank you for registering with us")
                        .build();
            } catch (MessagingException e) {
                throw new EmailErrorException(registeredUser.getEmail());
            }
        } else {
            throw new UserRegistrationErrorException();
        }

    }

    public AuthenticationResponse authenticate(LoginRequest request, HttpServletResponse response) {
        log.info("Authenticating user: {}", request);

        final String usernameOrEmail = request.getUsernameOrEmail().toLowerCase();
        final String password = request.getPassword();

        UserDto userDto = userService.findByUsernameOrEmail(usernameOrEmail);
        try {
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsernameOrEmail(),
                            request.getPassword()
                    ));



            String jwtToken = jwtService.generateToken(userService.loadUserByUsername(request.getUsernameOrEmail()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            Cookie jwtCookie = new Cookie("jwt", jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(3600);
            response.addCookie(jwtCookie);

            return AuthenticationResponse.builder()
                    .message("You have been authenticated successfully")
                    .userDto(userDto)
                    .build();
        }catch (DisabledException e){
            throw new AccountNotEnabledException();
        }catch (BadCredentialsException ex){
            throw new InvalidCredentialsException();
        }

    }

    public RegistrationResponse enableUser(String token) {
        UserToken userToken = tokenService.findUserTokenByToken(token);
        User user = userToken.getUser();
        user.setEnabled(true);
        userService.saveUser(user);

        return RegistrationResponse.builder()
                .header("Account Enabled")
                .body("Your account has been enabled successfully")
                .footer("Thank you for registering with us")
                .build();
    }

    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        UserDto userDto = userService.findByUsernameOrEmail(request.getEmail());
        User user = userRepository.findById(userDto.id()).orElseThrow(AccountDoesNotExistsException::new);
        try {
            emailFeatureService.sendCodeToForgotPassword(user.getEmail(), request.getCode());

            return ForgotPasswordResponse.builder()
                    .isEmailValid(true)
                    .response("Please enter the code sent to your email")
                    .build();
        } catch (MessagingException e) {
            throw new EmailErrorException(user.getEmail());
        }
    }

    public ChangePasswordResponse changePassword (ChangePasswordRequest request){
        UserDto userDto = userService.findByUsernameOrEmail(request.getEmail());
        User user = userRepository.findById(userDto.id()).orElseThrow(AccountDoesNotExistsException::new);
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userService.saveUser(user);
        try {
            emailFeatureService.sendGenericEmail(user.getEmail(), "Password Changed", String.format("%s\n%s","Your password has been changed on: ", new Date()), "Change Password Request");
            return ChangePasswordResponse.builder()
                    .header("Password Changed")
                    .body("""
                            <p>Your password has been changed successfully</p>
                            <br/>
                            <a href="/login">Login here</a>
                            """)
                    .build();
        } catch (MessagingException e) {
            throw new EmailErrorException(user.getEmail());
        }
    }

}
