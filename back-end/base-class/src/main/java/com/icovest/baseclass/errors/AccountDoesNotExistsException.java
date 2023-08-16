package com.icovest.baseclass.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AccountDoesNotExistsException extends RuntimeException{
    public AccountDoesNotExistsException(){
        super("Account does not exists!");
    }
}
