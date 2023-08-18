package com.icovest.baseclass.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Builder
@Data
@Schema(name = "SpecificFieldError", description = "SpecificFieldError")
public class SpecificFieldError {
    private String fieldName;
    private Object rejectedValue;
    private String errorMessage;
    private String exceptionName;
    private String constraint;
}
