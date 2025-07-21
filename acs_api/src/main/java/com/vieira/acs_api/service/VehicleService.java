package com.vieira.acs_api.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vieira.acs_api.exception.DuplicateLicensePlateException;
import com.vieira.acs_api.exception.VehicleHasActiveTripException;
import com.vieira.acs_api.exception.VehicleNotFoundException;
import com.vieira.acs_api.model.Vehicle;
import com.vieira.acs_api.model.VehicleStatus;
import com.vieira.acs_api.repository.TripRecordRepository;
import com.vieira.acs_api.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository repository;
    private final TripRecordRepository tripRecordRepository;

    public List<Vehicle> findAll() {
        return repository.findAll(Sort.by("id"));
    }

    public List<Vehicle> findByStatus(VehicleStatus status) {
        return repository.findByStatusOrderByIdAsc(status);
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
        // Verifica se o veículo existe
        repository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));
        
        // Verifica se o veículo tem viagens ativas
        if (tripRecordRepository.findFirstByIdVeiculoAndDataRetornoIsNullOrderByIdDesc(id).isPresent()) {
            throw new VehicleHasActiveTripException(id);
        }
        
        repository.deleteById(id);
    }
}
