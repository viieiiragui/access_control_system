package com.vieira.acs_api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vieira.acs_api.exception.DuplicateLicensePlateException;
import com.vieira.acs_api.exception.VehicleNotFoundException;
import com.vieira.acs_api.model.Vehicle;
import com.vieira.acs_api.model.VehicleStatus;
import com.vieira.acs_api.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository repository;

    public List<Vehicle> findAll() {
        return repository.findAll();
    }

    public List<Vehicle> findByStatus(VehicleStatus status) {
        return repository.findByStatus(status);
    }

    public Vehicle findByPlaca(String placa) {
        return repository.findByPlaca(placa)
                .orElseThrow(() -> new VehicleNotFoundException(placa));
    }

    public Vehicle create(Vehicle vehicle) {
        if (repository.existsByPlaca(vehicle.getPlaca())) {
            throw new DuplicateLicensePlateException(vehicle.getPlaca());
        }
        vehicle.setStatus(VehicleStatus.NO_PATIO);
        return repository.save(vehicle);
    }

    @Transactional
    public Vehicle updateStatus(Long id, VehicleStatus newStatus) {
        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));
        vehicle.setStatus(newStatus);
        return repository.save(vehicle);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
