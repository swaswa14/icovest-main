package com.icovest.baseclass.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailErrorException extends RuntimeException {
    public EmailErrorException(String email) { //todo test
        //todo Add to Exception handler
        super(String.format("Email sent to %s is not successful", email));
    }
}

