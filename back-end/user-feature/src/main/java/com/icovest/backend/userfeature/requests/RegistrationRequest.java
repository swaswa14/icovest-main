package com.icovest.backend.userfeature.requests;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegistrationRequest {
    @Email(message = "Must be a valid email")
    @NotBlank(message = "Email is blank")
    @NotNull(message = "Email is required" )
    private String email;




    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{5,19}$", message = "Username must be 6-20 characters long, must not start with a number, and can only contain letters and numbers.")
    @Size(min = 6, max = 20, message = "Username length should be between 6 and 20 characters")
    private String username;


    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,255}$",
            message = "Password must contain at least 1 digit, 1 lowercase letter, and 1 uppercase letter")
    @Size(min = 6, max = 255, message = "Password length should be between 6 and 255 characters")
    @NotBlank(message = "Password is required")
    private String password;

    private String invitationCode;
}
