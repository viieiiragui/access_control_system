package com.vieira.acs_api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TripDepartRequest {
    @JsonProperty("placa_veiculo")
    @NotBlank
    private String placaVeiculo;

    @JsonProperty("id_motorista")
    @NotNull
    private Long idMotorista;

    @NotBlank
    private String destino;

    @Nullable
    private String passageiros;
}
