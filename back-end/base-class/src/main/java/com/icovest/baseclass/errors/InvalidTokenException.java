package com.icovest.baseclass.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidTokenException extends RuntimeException{
    public InvalidTokenException() {
        super("Invalid Token");
    }
}
