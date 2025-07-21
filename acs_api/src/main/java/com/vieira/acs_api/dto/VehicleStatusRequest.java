package com.vieira.acs_api.dto;

import com.vieira.acs_api.model.VehicleStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VehicleStatusRequest {
    @NotNull(message = "Status é obrigatório")
    private VehicleStatus status;
}