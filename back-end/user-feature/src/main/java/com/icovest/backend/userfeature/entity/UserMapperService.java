package com.icovest.backend.userfeature.entity;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserMapperService implements Function<User, UserDto> {

    @Override
    public UserDto apply(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getAuthorities(),
                user.getUsdt()
        );
    }
}
