package com.icovest.backend.userfeature.entity;

import com.icovest.backend.userfeature.entity.validators.UniqueEntity;
import com.icovest.baseclass.enums.Roles;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
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


    @ElementCollection(targetClass = Roles.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)  // Store enum as a string (e.g. "ADMIN", "USER", etc.)
    @CollectionTable(name = "user_roles")  // Name of the table to store the mapping
    @Column(name = "role")
    private List <Roles> roles = new ArrayList<>();

    @Column(unique = true)
    private String inviteCode;

    @Embedded
    @Builder.Default
    private Usdt usdt = Usdt.builder().balance(BigDecimal.valueOf(0.00)).build();
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
