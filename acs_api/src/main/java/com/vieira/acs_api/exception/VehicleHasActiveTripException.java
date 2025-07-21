package com.vieira.acs_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class VehicleHasActiveTripException extends RuntimeException {
    public VehicleHasActiveTripException() {
        super("Não é possível excluir veículo com viagem ativa");
    }
    
    public VehicleHasActiveTripException(Long vehicleId) {
        super("Não é possível excluir veículo com ID " + vehicleId + " pois possui viagem ativa");
    }
}
