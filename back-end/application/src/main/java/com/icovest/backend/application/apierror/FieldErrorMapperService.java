package com.icovest.backend.application.apierror;

import com.icovest.baseclass.dto.CustomFieldErrors;
import com.icovest.baseclass.dto.FieldErrorDto;
import com.icovest.baseclass.dto.SpecificFieldError;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class FieldErrorMapperService implements Function<CustomFieldErrors, FieldErrorDto> {
    @Override
    public FieldErrorDto apply(CustomFieldErrors customFieldErrors) {


        return new FieldErrorDto(
                customFieldErrors.getSpecificFieldErrorList().size(),
                customFieldErrors.getSpecificFieldErrorList(),
                customFieldErrors.getHttpStatus(),
                customFieldErrors.getException().getSimpleName()
        );
    }
}
