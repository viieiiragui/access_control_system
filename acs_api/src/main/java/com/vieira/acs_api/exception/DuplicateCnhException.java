package com.vieira.acs_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateCnhException extends RuntimeException {
    public DuplicateCnhException() {
        super("CNH já cadastrada");
    }
}