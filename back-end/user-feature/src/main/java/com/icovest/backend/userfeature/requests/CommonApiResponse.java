package com.icovest.backend.userfeature.requests;

import com.icovest.baseclass.enums.ApiResponseStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommonApiResponse {
    @Enumerated(EnumType.STRING)
    private ApiResponseStatus status;
    private String message;
}
