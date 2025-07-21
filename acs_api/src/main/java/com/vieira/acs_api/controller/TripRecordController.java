package com.vieira.acs_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vieira.acs_api.dto.TripArriveRequest;
import com.vieira.acs_api.dto.TripDepartRequest;
import com.vieira.acs_api.model.TripRecord;
import com.vieira.acs_api.service.TripRecordService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/viagens")
@RequiredArgsConstructor
public class TripRecordController {
    private final TripRecordService tripRecordService;

    @PostMapping("/saida")
    public ResponseEntity<TripRecord> depart(@Valid @RequestBody TripDepartRequest req) {
        TripRecord saved = tripRecordService.createTripDepart(req);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/retorno")
    public ResponseEntity<TripRecord> arrive(@Valid @RequestBody TripArriveRequest req) {
        TripRecord updatedRecord = tripRecordService.finalizeTripByVehiclePlate(req.getPlacaVeiculo());
        return ResponseEntity.ok(updatedRecord);
    }
}
