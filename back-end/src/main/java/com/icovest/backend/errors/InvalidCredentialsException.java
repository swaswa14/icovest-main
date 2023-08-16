package com.icovest.backend.errors;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidCredentialsException extends BadCredentialsException {

    public InvalidCredentialsException(){
        super("username or password is incorrect!");
    }
}
