package com.vieira.acs_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.vieira.acs_api.model.TripRecord;
import com.vieira.acs_api.service.TripRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/registros")
@RequiredArgsConstructor
public class HistoryController {
    private final TripRecordService tripRecordService;

    @GetMapping
    public List<TripRecord> findAll() {
        return tripRecordService.findAll();
    }
}
