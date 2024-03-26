package com.vjrai.backend.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class ValidationExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Object>handleValidationException(MethodArgumentNotValidException exception){

        Map<String, List<String>> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {

            String fieldName = ((FieldError) error ).getField();
            String errorMessage = error.getDefaultMessage();

            errors.putIfAbsent(fieldName, new ArrayList<>());
            errors.get(fieldName).add(errorMessage);

        });

        Map<String, Object> response = new HashMap<>();
        response.put("status", "401");
        response.put("type", "BAD_REQUEST");
        response.put("errors", errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

}
