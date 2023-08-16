package com.icovest.backend.application.apierror;

import com.icovest.backend.dto.ApiError;
import com.icovest.backend.dto.CustomFieldErrors;
import com.icovest.backend.dto.FieldErrorDto;
import com.icovest.backend.dto.SpecificFieldError;
import com.icovest.backend.errors.ValidationFieldException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiErrorService {
    private final FieldErrorMapperService fieldErrorDTOMapper;

    public ApiError apiErrorBuilder(Exception ex, HttpStatus httpStatus){
        return ApiError.builder()
                .errorMessage(ex.getMessage())
                .status(httpStatus)
                .statusCode(Integer.toString(httpStatus.value()))
                .timeStamp(ZonedDateTime.now(ZoneId.of("Z")))
                .exception(ex.getClass().getSimpleName())
                .build();
    }


    public FieldErrorDto fieldErrorDTOFunction(BindingResult bindingResult) {
        List<FieldError> fieldErrorList = bindingResult.getFieldErrors();
        List<SpecificFieldError> specificFieldErrorList = fieldErrorList
                .stream()
                .map(t-> SpecificFieldError
                        .builder()
                        .exceptionName(t.getClass().getSimpleName())
                        .fieldName(t.getField())
                        .rejectedValue(t.getRejectedValue())
                        .errorMessage(t.getDefaultMessage())
                        .constraint(t.getCode())
                        .build()
                )
                .toList();

        return fieldErrorDTOMapper.apply(
                CustomFieldErrors.builder()
                        .specificFieldErrorList(specificFieldErrorList)
                        .httpStatus(HttpStatus.UNPROCESSABLE_ENTITY)
                        .exception(ValidationFieldException.class)
                        .build());
    }
}
