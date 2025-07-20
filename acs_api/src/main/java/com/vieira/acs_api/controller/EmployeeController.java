package com.vieira.acs_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vieira.acs_api.dto.EmployeeRequest;
import com.vieira.acs_api.model.Employee;
import com.vieira.acs_api.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/funcionarios")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody @Valid EmployeeRequest req) {
        Employee employee = req.toEntity();
        Employee saved = employeeService.create(employee);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> putMethodName(@PathVariable Long id, @Valid @RequestBody EmployeeRequest req) {
        Employee employee = req.toEntity();
        employee.setId(id);
        Employee updated = employeeService.update(id, employee);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
