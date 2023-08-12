package com.icovest.backend.userfeature.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordRequest {
    private String email;
    private String newPassword;
    private String confirmNewPassword;
}
