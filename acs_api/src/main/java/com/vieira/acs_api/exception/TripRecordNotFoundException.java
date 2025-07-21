package com.vieira.acs_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TripRecordNotFoundException extends RuntimeException {
    public TripRecordNotFoundException() {
        super("Registro de viagem não encontrado");
    }

    public TripRecordNotFoundException(Long id) {
        super("Registro de viagem não encontrado: " + id);
    }
}
