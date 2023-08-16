package com.icovest.baseclass.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class InviteCodeDoesNotExistsException extends RuntimeException{
    public InviteCodeDoesNotExistsException() {
        super("Invite code does not exists!");
    }
}
