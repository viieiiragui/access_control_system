package com.vieira.acs_api.dto;

import com.vieira.acs_api.model.Vehicle;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VehicleRequest {
    @NotBlank(message = "Placa é obrigatória")
    private String placa;

    @NotBlank(message = "Modelo é obrigatório")
    private String modelo;

    public Vehicle toEntity() {
        Vehicle v = new Vehicle();
        v.setPlaca(this.placa);
        v.setModelo(this.modelo);
        return v;
    }
}
