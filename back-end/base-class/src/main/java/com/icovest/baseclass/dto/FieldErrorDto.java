package com.icovest.baseclass.dto;

import org.springframework.http.HttpStatus;

import java.util.List;


public record FieldErrorDto(int numberOfErrors,
                            List<SpecificFieldError> errorList,
                            HttpStatus status,
                            String exception) {
}
