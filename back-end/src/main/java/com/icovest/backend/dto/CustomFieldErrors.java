package com.icovest.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;
@Data
@Getter
@Builder
public class CustomFieldErrors {
    private HttpStatus httpStatus;
    private List<SpecificFieldError> specificFieldErrorList;
    private Class<?> exception;
}
