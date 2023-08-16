package com.icovest.backend.userfeature.entity;

import com.icovest.baseclass.enums.Roles;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.persistence.*;

@Entity

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@ToString
public class User implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "base_sequence",
            sequenceName = "base_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "base_sequence"
    )
    private Long id;
    private String email;
    private String username;
    private String password;

    @Builder.Default
    private boolean isEnabled = false;
    @Transient
    private List <Roles> roles = new ArrayList<>();

    @Column(unique = true)
    private String inviteCode;

    @Embedded
    private Usdt usdt;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r.name().toUpperCase()))
                .collect(Collectors.toList());
    }


    private String invitedBy;

    @ManyToMany
    private List<User> invitedUsers;

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
