package com.icovest.baseclass.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class AccountNotEnabledException extends RuntimeException{
    public AccountNotEnabledException() {
        super("Account not enabled- Check the email for confirmation");
    }
}
