package com.icovest.backend.application.config;

import com.icovest.backend.application.apierror.ApiErrorService;
import com.icovest.baseclass.dto.ApiError;
import com.icovest.baseclass.dto.FieldErrorDto;
import com.icovest.baseclass.errors.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private final ApiErrorService service;
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        BindingResult bindingResult = ex.getBindingResult();
        FieldErrorDto fieldErrorDTO = service.fieldErrorDTOFunction(bindingResult);
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(fieldErrorDTO);
    }


    @ExceptionHandler(AccountDoesNotExistsException.class)
    public ResponseEntity<ApiError> handleAccountDoesNotExistsException(AccountDoesNotExistsException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body((service.apiErrorBuilder(ex, HttpStatus.NOT_FOUND)));

    }

    @ExceptionHandler(AccountNotEnabledException.class)
    public ResponseEntity<ApiError> handleAccountNotEnabledException(AccountNotEnabledException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.FORBIDDEN), HttpStatus.FORBIDDEN);

    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiError> handleDuplicateEmailException(DuplicateEmailException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.CONFLICT), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<ApiError> handleDuplicateUserName(DuplicateUsernameException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.CONFLICT), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(EmailErrorException.class)
    public ResponseEntity<ApiError> emailErrorException(EmailErrorException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.BAD_REQUEST), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiError> handleError(InvalidCredentialsException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.BAD_REQUEST), HttpStatus.CONFLICT);

    }
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiError> handleError(InvalidTokenException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.BAD_REQUEST), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(InviteCodeDoesNotExistsException.class)
    public ResponseEntity<ApiError> handleError(InviteCodeDoesNotExistsException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.CONFLICT), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(SamePasswordException.class)
    public ResponseEntity<ApiError> handleError(SamePasswordException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.BAD_REQUEST), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(UsernameOrEmailExistsException.class)
    public ResponseEntity<ApiError> handleError(UsernameOrEmailExistsException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.BAD_REQUEST), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(UserRegistrationErrorException.class)
    public ResponseEntity<ApiError> handleError(UserRegistrationErrorException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.UNPROCESSABLE_ENTITY), HttpStatus.CONFLICT);

    }

    @ExceptionHandler(ValidationFieldException.class)
    public ResponseEntity<ApiError> handleError(ValidationFieldException ex){
        return new ResponseEntity<>(service.apiErrorBuilder(ex, HttpStatus.UNPROCESSABLE_ENTITY), HttpStatus.CONFLICT);

    }
}
