package com.vieira.acs_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vieira.acs_api.dto.VehicleRequest;
import com.vieira.acs_api.dto.VehicleStatusRequest;
import com.vieira.acs_api.model.Vehicle;
import com.vieira.acs_api.model.VehicleStatus;
import com.vieira.acs_api.service.VehicleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/veiculos")
@RequiredArgsConstructor
public class VehicleController {
    private final VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> listAll(@RequestParam(required = false) VehicleStatus status) {
        if (status != null) {
            return vehicleService.findByStatus(status);
        }
        return vehicleService.findAll();
    }

    @PostMapping
    public ResponseEntity<Vehicle> create(@Valid @RequestBody VehicleRequest req) {
        Vehicle vehicle = req.toEntity();
        Vehicle saved = vehicleService.create(vehicle);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Vehicle> update(@PathVariable Long id, @Valid @RequestBody VehicleStatusRequest req) {
        Vehicle saved = vehicleService.updateStatus(id, req.getStatus());
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vehicleService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
