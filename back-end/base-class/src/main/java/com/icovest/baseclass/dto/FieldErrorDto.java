package com.icovest.baseclass.dto;

import org.springframework.http.HttpStatus;

import java.util.Map;

public record FieldErrorDto(int numberOfErrors,
                            Map<String, SpecificFieldError> errorMaps,
                            HttpStatus status,
                            String exception) {
}
