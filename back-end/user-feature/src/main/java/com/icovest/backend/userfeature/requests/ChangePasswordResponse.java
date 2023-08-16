package com.icovest.backend.userfeature.requests;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordResponse {

    private String header;
    private String body;
}
