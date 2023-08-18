package com.icovest.backend.userfeature.entity.validators;

import com.icovest.backend.userfeature.entity.User;
import com.icovest.backend.userfeature.entity.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UniqueEntityValidator implements ConstraintValidator<UniqueEntity,String> {

    private final UserRepository userRepository;
    private String fieldName;

    @Override
    public void initialize(UniqueEntity constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        fieldName = constraintAnnotation.fieldName();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            return true; // null is considered valid
        }
        Specification<User> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(fieldName), value);
        Optional<User> result = userRepository.findOne(spec);

        return result.isEmpty();
    }
}
