package com.icovest.backend.userfeature.entity;

import com.icovest.backend.errors.IdDoesNotExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final UserMapperService mapper;

    public UserDto createUser(User user){
        return mapper.apply(repository.saveAndFlush(user));
    }

    public boolean deleteUser(Long id){
        // deletes the user
        repository.deleteById(id);

        //return true if user is deleted
        return !repository.existsById(id);
    }

//    public UserDto updateUser(Long id, User updatedUser){
//        User user = repository.findById(id).orElseThrow(IdDoesNotExistsException::new);
//        if(user.)
//    }

}
