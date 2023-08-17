package com.icovest.backend.userfeature.requests;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    protected String user;
    protected String pass;
}
