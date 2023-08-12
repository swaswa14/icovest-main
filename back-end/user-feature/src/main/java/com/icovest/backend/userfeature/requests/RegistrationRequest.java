package com.icovest.backend.userfeature.requests;

import lombok.*;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegistrationRequest {
    private String email;
    private String username;
    private String password;
    private String invitationCode;
}
