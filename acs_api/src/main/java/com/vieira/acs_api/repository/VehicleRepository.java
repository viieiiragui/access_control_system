package com.vieira.acs_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.acs_api.model.Vehicle;
import com.vieira.acs_api.model.VehicleStatus;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    boolean existsByPlaca(String placa);

    List<Vehicle> findByStatus(VehicleStatus status);
}
