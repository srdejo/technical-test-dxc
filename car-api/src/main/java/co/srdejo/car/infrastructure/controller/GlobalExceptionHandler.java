package co.srdejo.car.infrastructure.controller;

import co.srdejo.car.application.dto.CarDto;
import co.srdejo.car.domain.exception.AuthenticationException;
import co.srdejo.car.domain.exception.CarNotFoundException;
import co.srdejo.car.domain.exception.InvalidCarDataException;
import co.srdejo.car.domain.exception.UnauthorizedAccessException;
import com.fasterxml.jackson.annotation.JsonAlias;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Map<String, String> handleAuthenticationException(AuthenticationException ex) {
        return Map.of("error", ex.getMessage());
    }

    @ExceptionHandler(CarNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public Map<String, String> handleNotFoundException(CarNotFoundException ex) {
        return Map.of("error", ex.getMessage());
    }

    @ExceptionHandler(InvalidCarDataException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, String> handleInvalidCarDataException(InvalidCarDataException ex) {
        return Map.of("error", ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Map<String, String> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        return Map.of("error", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String jsonAlias = getJsonAlias(CarDto.class, fieldName); // Buscar alias
            errors.put(jsonAlias != null ? jsonAlias : fieldName, error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }


    private String getJsonAlias(Class<?> clazz, String fieldName) {
        try {
            Field field = clazz.getDeclaredField(fieldName);
            JsonAlias alias = field.getAnnotation(JsonAlias.class);
            if (alias != null && alias.value().length > 0) {
                return alias.value()[0]; // Retorna el primer alias si existe
            }
        } catch (NoSuchFieldException ignored) {}
        return null; // Si no hay alias, retorna null
    }
}
