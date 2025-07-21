package com.vieira.acs_api.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.vieira.acs_api.dto.TripDepartRequest;
import com.vieira.acs_api.exception.TripRecordAlreadyArrivedException;
import com.vieira.acs_api.exception.TripRecordNotFoundException;
import com.vieira.acs_api.model.Employee;
import com.vieira.acs_api.model.TripRecord;
import com.vieira.acs_api.model.Vehicle;
import com.vieira.acs_api.model.VehicleStatus;
import com.vieira.acs_api.repository.TripRecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TripRecordService {
    private final TripRecordRepository repository;
    private final VehicleService vehicleService;
    private final EmployeeService employeeService;

    public List<TripRecord> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Optional<TripRecord> findLastOpenTripByVehicleId(Long idVeiculo) {
        return repository.findFirstByIdVeiculoAndDataRetornoIsNullOrderByIdDesc(idVeiculo);
    }

    public TripRecord create(TripRecord tr) {
        return repository.save(tr);
    }

    public TripRecord update(TripRecord tripRecord) {
        TripRecord existingTrip = repository.findById(tripRecord.getId())
                .orElseThrow(() -> new TripRecordNotFoundException(tripRecord.getId()));

        if (existingTrip.getDataRetorno() != null) {
            throw new TripRecordAlreadyArrivedException();
        }

        existingTrip.setDataRetorno(Instant.now());
        return repository.save(existingTrip);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public TripRecord createTripDepart(TripDepartRequest req) {
        Vehicle vehicle = vehicleService.findByPlaca(req.getPlacaVeiculo());
        Employee driver = employeeService.findById(req.getIdMotorista());

        if (vehicle.getStatus() != VehicleStatus.NO_PATIO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Veículo fora do pátio.");
        }

        TripRecord tripRecord = new TripRecord();
        tripRecord.setIdVeiculo(vehicle.getId());
        tripRecord.setIdMotorista(driver.getId());
        tripRecord.setDestino(req.getDestino());
        tripRecord.setPassageiros(req.getPassageiros());
        tripRecord.setDataSaida(Instant.now());

        TripRecord saved = repository.save(tripRecord);
        vehicleService.updateStatus(vehicle.getId(), VehicleStatus.EM_VIAGEM);

        return saved;
    }

    @Transactional
    public TripRecord finalizeTripByVehiclePlate(String placaVeiculo) {
        Vehicle vehicle = vehicleService.findByPlaca(placaVeiculo);

        if (vehicle.getStatus() != VehicleStatus.EM_VIAGEM) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Veículo se encontra no pátio.");
        }

        TripRecord activeTripRecord = repository.findFirstByIdVeiculoAndDataRetornoIsNullOrderByIdDesc(vehicle.getId())
                .orElseThrow(() -> new TripRecordNotFoundException());

        if (activeTripRecord.getDataRetorno() != null) {
            throw new TripRecordAlreadyArrivedException();
        }

        activeTripRecord.setDataRetorno(Instant.now());
        TripRecord updatedRecord = repository.save(activeTripRecord);
        vehicleService.updateStatus(vehicle.getId(), VehicleStatus.NO_PATIO);

        return updatedRecord;
    }
}
