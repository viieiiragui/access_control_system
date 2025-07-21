package com.vieira.acs_api.dto;

import java.time.Instant;

import com.vieira.acs_api.model.TripRecord;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TripRecordRequest {
    @NotNull(message = "ID do veículo é obrigatório")
    private Long idVeiculo;

    @NotNull(message = "ID do motorista é obrigatório")
    private Long idMotorista;
    
    @NotBlank(message = "Destino é obrigatório")
    private String destino;
    
    @NotBlank(message = "Passageiros é obrigatório")
    private String passageiros;

    public TripRecord toEntity() {
        TripRecord t = new TripRecord();
        t.setIdVeiculo(this.idVeiculo);
        t.setIdMotorista(this.idMotorista);
        t.setDestino(this.destino);
        t.setPassageiros(this.passageiros);
        t.setDataSaida(Instant.now());
        return t;
    }
}
