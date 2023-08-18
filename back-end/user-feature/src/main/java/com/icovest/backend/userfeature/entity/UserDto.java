package com.icovest.backend.userfeature.entity;

import org.springframework.security.core.GrantedAuthority;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

public record UserDto(
        Long id,
        String username,
        String email,
        List<String> authorities,
        BigDecimal balance,
        String invitationCode
) {
}
