package com.icovest.backend.userfeature.entity.token;

import com.icovest.backend.userfeature.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<UserToken, Long> {
    Optional<UserToken> findUserTokenByToken(String token);

    Optional<UserToken> findUserTokenByUser(User user);
}
