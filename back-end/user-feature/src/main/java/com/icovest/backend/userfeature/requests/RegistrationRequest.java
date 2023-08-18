package com.icovest.backend.userfeature.requests;

import com.icovest.backend.userfeature.entity.validators.EntityExists;
import com.icovest.backend.userfeature.entity.validators.UniqueEntity;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

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
    @UniqueEntity(fieldName = "email", message = "Email already exists")
    private String email;



    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{5,19}$", message = "Username must be 6-20 characters long, must not start with a number, and can only contain letters and numbers.")
    @Size(min = 6, max = 20, message = "Username length should be between 6 and 20 characters")

    @UniqueEntity(fieldName = "username", message = "Username already exists")

    private String username;


    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,255}$",
            message = "Password must contain at least 1 digit, 1 lowercase letter, and 1 uppercase letter")
    @Size(min = 6, max = 255, message = "Password length should be between 6 and 255 characters")
    @NotBlank(message = "Password is required")

    private String password;


    @EntityExists(fieldName = "inviteCode", message = "Invitation code does not exist")
    private String invitationCode;
}
