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
public class EntityExistsValidator implements ConstraintValidator<EntityExists,String> {
    private final UserRepository userRepository;
    private String fieldName;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            return true; // null is considered valid
        }
        Specification<User> spec = (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(fieldName), value);
        Optional<User> result = userRepository.findOne(spec);

        return result.isPresent();
    }

    @Override
    public void initialize(EntityExists constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        fieldName = constraintAnnotation.fieldName();
    }
}
