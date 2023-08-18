package com.icovest.backend.userfeature.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountEnableResponse {
    private String token;
    private boolean expired;
}
