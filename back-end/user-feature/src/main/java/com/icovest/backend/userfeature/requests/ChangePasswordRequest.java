package com.icovest.backend.userfeature.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordRequest {
    private String email;
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,255}$",
            message = "Password must contain at least 1 digit, 1 lowercase letter, and 1 uppercase letter")
    @Size(min = 6, max = 255, message = "Password length should be between 6 and 255 characters")
    @NotBlank(message = "Password is required")
    private String newPassword;
}
