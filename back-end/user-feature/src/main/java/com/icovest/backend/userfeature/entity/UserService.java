package com.icovest.backend.userfeature.entity;


import com.icovest.backend.errors.IdDoesNotExistsException;
import com.icovest.backend.errors.UsernameOrEmailExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final UserMapperService mapper;

    public UserDto saveUser(User user){
        return mapper.apply(repository.saveAndFlush(user));
    }

    public boolean deleteUser(Long id){
        // deletes the user
        repository.deleteById(id);

        //return true if user is deleted
        return !repository.existsById(id);
    }

    public UserDto findById(Long id){
        return mapper.apply(repository.findById(id).orElseThrow(IdDoesNotExistsException::new));
    }

    public UserDto findByUsernameOrEmail(String usernameOrEmail){
        return mapper.apply(
                repository.findUserByEmail(usernameOrEmail)
                        .orElse(
                                repository.findUserByUsername(usernameOrEmail)
                                        .orElseThrow(UsernameOrEmailExistsException::new)
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
        User user = repository.findById(id).orElseThrow(IdDoesNotExistsException::new);
        user.setEnabled(true);
        return saveUser(user);
    }



}
