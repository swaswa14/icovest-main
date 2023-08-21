package com.icovest.backend.userfeature.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserMapperService implements Function<User, UserDto> {

    @Override
    public UserDto apply(User user) {
        List<String> authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                authorities,
                user.getUsdt().getBalance(),
                user.getInviteCode(),
                user.isEnabled()
        );
    }
}
