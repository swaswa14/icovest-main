package com.icovest.backend.userfeature.entity;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByInviteCode(String inviteCode);

    boolean existsUserByUsername(String username);

    boolean existsUserByEmail(String email);

    boolean existsUserByInviteCode(String inviteCode);

}
