package com.icovest.backend.enums;

import lombok.Getter;

@Getter
public enum Roles {
    ADMIN_ACCESS("Admin Access"),
    CLIENT_ACCESS("Client Access"),
    AGENT_ACCESS("Agent Access"),
    BASIC_ACCESS("Basic Access");

    private final String role;

    private Roles(String role){
        this.role = role;
    }

}
