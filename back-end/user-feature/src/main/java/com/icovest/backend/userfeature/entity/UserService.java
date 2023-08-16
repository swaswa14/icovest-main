package com.icovest.backend.userfeature.entity;


import com.icovest.baseclass.errors.AccountDoesNotExistsException;
import com.icovest.baseclass.errors.InviteCodeDoesNotExistsException;
import com.icovest.baseclass.errors.UsernameOrEmailExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository repository;
    private final UserMapperService mapper;

    public UserDto saveUser(User user){
        if(user.getInviteCode().trim().equals("")) {
            User inviter = repository.findUserByInviteCode(user.getInvitedBy()).orElseThrow(InviteCodeDoesNotExistsException::new);
            inviter.getInvitedUsers().add(user);
            repository.saveAndFlush(inviter);
        }
        return mapper.apply(repository.saveAndFlush(user));
    }

    public boolean deleteUser(Long id){
        // deletes the user
        repository.deleteById(id);

        //return true if user is deleted
        return !repository.existsById(id);
    }

    public UserDto findById(Long id){
        return mapper.apply(repository.findById(id).orElseThrow(AccountDoesNotExistsException::new));
    }

    public UserDto findByUsernameOrEmail(String usernameOrEmail){
        return mapper.apply(
                repository.findUserByEmail(usernameOrEmail)
                        .orElse(
                                repository.findUserByUsername(usernameOrEmail)
                                        .orElseThrow(AccountDoesNotExistsException::new)
                        )
        );
    }

    public List<UserDto> findAll(){
        return repository.findAll()
                .stream()
                .map(mapper)
                .collect(Collectors.toList());
    }



    public UserDto changePassword(String email, String newPassword){
         User user = repository.findUserByEmail(email).orElseThrow(UsernameOrEmailExistsException::new);
            user.setPassword(newPassword);

            return saveUser(user);

    }

    public UserDto enableAccount(Long id){
        User user = repository.findById(id).orElseThrow(AccountDoesNotExistsException::new);
        user.setEnabled(true);
        return saveUser(user);
    }


    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        return repository.findUserByUsername(usernameOrEmail).orElse(
                repository.findUserByEmail(usernameOrEmail).orElseThrow(AccountDoesNotExistsException::new)
        );
    }


    public String createInviteCode(){
        boolean isUnique = false;
        String inviteCode="";
        do {
            inviteCode = generateInviteCode();
            isUnique = !repository.existsUserByInviteCode(inviteCode);
        }while (!isUnique);

        return inviteCode;
    }

    private String generateInviteCode() {
        int firstDigit = (int) (Math.random() * 9) + 1;

        // Generate a random number between 0-99999 for the next five digits (ensuring it's 5 digits long)
        int nextFiveDigits = (int) (Math.random() * ((99999 - 10000) + 1)) + 10000;

        return Integer.toString(firstDigit) + Integer.toString(nextFiveDigits);
    }
}
