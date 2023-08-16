package com.icovest.backend.userfeature.entity.token;

import com.icovest.backend.errors.InvalidTokenException;
import com.icovest.backend.userfeature.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository repository;

    public Date generateExpiryDate(int days, int months, int years){
        Calendar calendar = Calendar.getInstance();

        // Add the specified days, months, and years to the current date
        calendar.add(Calendar.DAY_OF_MONTH, days);
        calendar.add(Calendar.MONTH, months);
        calendar.add(Calendar.YEAR, years);

        // Get the calculated date

        return calendar.getTime();
    }

    public UserToken userTokenBuilder(User user, TokenType tokenType, int days, int month, int years){
        return repository.save(UserToken.builder()
                .expiryDate(generateExpiryDate(days,month,years))
                .tokenType(tokenType)
                .user(user)
                .build());
    }

    public User getUserByToken(String token){
        return repository.findUserTokenByToken(token).orElseThrow(InvalidTokenException::new).getUser();
    }

    public UserToken findUserTokenByToken(String token){
        return repository.findUserTokenByToken(token).orElseThrow(InvalidTokenException::new);
    }
}
