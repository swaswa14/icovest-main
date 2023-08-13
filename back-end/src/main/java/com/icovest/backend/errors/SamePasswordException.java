package com.icovest.backend.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SamePasswordException extends RuntimeException {
    public SamePasswordException() {
        super("Password is the same as the old one!");
    }
}
