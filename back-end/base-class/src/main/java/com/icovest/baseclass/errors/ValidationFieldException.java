package com.icovest.baseclass.errors;

import com.icovest.baseclass.dto.FieldErrorDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class ValidationFieldException extends RuntimeException{
    private final FieldErrorDto fieldErrorDTO;

    public ValidationFieldException(String message, FieldErrorDto fieldErrorDTO) {
        super(message);
        this.fieldErrorDTO = fieldErrorDTO;
    }
}