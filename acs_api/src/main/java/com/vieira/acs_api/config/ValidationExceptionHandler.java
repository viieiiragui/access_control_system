package com.vieira.acs_api.config;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.vieira.acs_api.model.VehicleStatus;

@RestControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            @NonNull MethodArgumentNotValidException ex,
            @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status,
            @NonNull WebRequest request) {
        var errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getDefaultMessage())
                .toList();

        var body = Map.of(
                "status", status.value(),
                "error", status.toString(),
                "errors", errors);

        return new ResponseEntity<>(body, headers, status);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        Class<?> requiredType = ex.getRequiredType();
        
        if (requiredType != null && requiredType.isEnum() && 
            VehicleStatus.class.equals(requiredType)) {
            
            String[] validValues = {"NO_PATIO", "EM_VIAGEM"};
            
            var body = Map.of(
                "status", HttpStatus.BAD_REQUEST.value(),
                "error", "Bad Request",
                "message", "Valor inválido para o parâmetro 'status'",
                "detail", String.format("Valor '%s' não é válido.",  ex.getValue()),
                "validValues", validValues
            );
            
            return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
        }
        
        // Para outros tipos de erro de conversão, retorna erro genérico
        var body = Map.of(
            "status", HttpStatus.BAD_REQUEST.value(),
            "error", "Bad Request",
            "message", "Erro de conversão de parâmetro",
            "detail", ex.getMessage()
        );
        
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
}
