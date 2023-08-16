package com.icovest.backend.application.apierror;

import com.icovest.backend.dto.CustomFieldErrors;
import com.icovest.backend.dto.FieldErrorDto;
import com.icovest.backend.dto.SpecificFieldError;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class FieldErrorMapperService implements Function<CustomFieldErrors, FieldErrorDto> {
    @Override
    public FieldErrorDto apply(CustomFieldErrors customFieldErrors) {
        Map<String, SpecificFieldError> objectMap = new HashMap<>();
        for(SpecificFieldError field : customFieldErrors.getSpecificFieldErrorList()){
            objectMap.put(field.getFieldName(), field);
        }

        return new FieldErrorDto(
                customFieldErrors.getSpecificFieldErrorList().size(),
                objectMap,
                customFieldErrors.getHttpStatus(),
                customFieldErrors.getException().getSimpleName()
        );
    }
}
