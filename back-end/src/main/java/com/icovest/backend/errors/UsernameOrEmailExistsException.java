package com.icovest.backend.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameOrEmailExistsException extends RuntimeException{

    public UsernameOrEmailExistsException(){
        super("Username or Email already exists!");
    }
}
