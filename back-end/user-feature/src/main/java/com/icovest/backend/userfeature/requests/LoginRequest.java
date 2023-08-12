package com.icovest.backend.userfeature.requests;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String usernameOrEmail;
    private String password;
}
