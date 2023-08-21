package com.icovest.backend.userfeature.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResendEmailVerificationRequest {
    private String email;
}
