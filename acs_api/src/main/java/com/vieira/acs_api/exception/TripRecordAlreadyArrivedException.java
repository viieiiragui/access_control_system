package com.vieira.acs_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class TripRecordAlreadyArrivedException extends RuntimeException {
    public TripRecordAlreadyArrivedException() {
        super("Registro de viagem já finalizado");
    }
}
