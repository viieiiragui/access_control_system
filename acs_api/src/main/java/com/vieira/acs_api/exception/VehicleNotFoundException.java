package com.vieira.acs_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class VehicleNotFoundException extends RuntimeException {
    public VehicleNotFoundException(Long id) {
        super("Veículo não encontrado com ID: " + id);
    }
    
    public VehicleNotFoundException(String licensePlate) {
        super("Veículo não encontrado com placa: " + licensePlate);
    }
}
