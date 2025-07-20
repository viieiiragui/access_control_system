package com.vieira.acs_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.acs_api.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsByPlaca(String placa);
}
