package com.vieira.acs_api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TripArriveRequest {
    @JsonProperty("placa_veiculo")
    @NotBlank
    private String placaVeiculo;
}
