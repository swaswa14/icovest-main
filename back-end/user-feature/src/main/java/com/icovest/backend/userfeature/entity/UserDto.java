package com.icovest.backend.userfeature.entity;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public record UserDto(
        Long id,
        String username,
        String email,
        Collection<? extends GrantedAuthority> authorities,
        Usdt usdt
) {
}
