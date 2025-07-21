package com.vieira.acs_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateLicensePlateException extends RuntimeException {
    public DuplicateLicensePlateException(String licensePlate) {
        super("Placa já cadastrada: " + licensePlate);
    }
}