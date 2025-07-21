package com.vieira.acs_api.model;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "registro_viagem", indexes = {
        @Index(name = "idx_veiculo_data_retorno", columnList = "id_veiculo, data_retorno"),
        @Index(name = "idx_motorista", columnList = "id_funcionario_motorista")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_veiculo", nullable = false)
    private Long idVeiculo;

    @Column(name = "id_funcionario_motorista", nullable = false)
    private Long idMotorista;

    @Column(nullable = false)
    private String destino;

    @Column()
    private String passageiros;

    @Column(name = "data_saida", nullable = false)
    private Instant dataSaida;

    @Column(name = "data_retorno")
    private Instant dataRetorno;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();
}
