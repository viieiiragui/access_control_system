package com.vieira.acs_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.acs_api.model.TripRecord;

public interface TripRecordRepository extends JpaRepository<TripRecord, Long> {

    Optional<TripRecord> findFirstByIdVeiculoAndDataRetornoIsNullOrderByIdDesc(Long idVeiculo);
}
