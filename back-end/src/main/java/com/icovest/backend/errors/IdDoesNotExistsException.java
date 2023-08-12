package com.icovest.backend.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class IdDoesNotExistsException extends RuntimeException{
    public IdDoesNotExistsException(){
        super("ID does not exists!");
    }
}
