package com.icovest.baseclass.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class UserRegistrationErrorException extends RuntimeException{
    public UserRegistrationErrorException() {
        super("There was an error encountered during the registration process");
    }
}
