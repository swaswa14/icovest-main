package com.icovest.backend.userfeature.requests;

import com.icovest.backend.userfeature.entity.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder

public class AuthenticationResponse {
    private String message;
    private UserDto userDto;
}
