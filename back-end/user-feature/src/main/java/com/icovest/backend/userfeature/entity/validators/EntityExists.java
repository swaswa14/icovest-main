package com.icovest.backend.userfeature.entity.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EntityExistsValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface EntityExists {
    String message() default "";
    String fieldName();
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
