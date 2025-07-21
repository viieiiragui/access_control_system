package com.vieira.acs_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vieira.acs_api.exception.DuplicateCnhException;
import com.vieira.acs_api.exception.EmployeeNotFoundException;
import com.vieira.acs_api.model.Employee;
import com.vieira.acs_api.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository repository;

    public List<Employee> findAll() {
        return repository.findAll();
    }

    public Employee findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    public Employee create(Employee employee) {
        if (repository.existsByCnh(employee.getCnh())) {
            throw new DuplicateCnhException();
        }
        return repository.save(employee);
    }

    public Employee update(Long id, Employee updated) {
        Employee e = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        // Verifica se a CNH foi alterada e se já existe para outro funcionário
        if (!e.getCnh().equals(updated.getCnh()) && repository.existsByCnh(updated.getCnh())) {
            throw new DuplicateCnhException();
        }

        e.setNome(updated.getNome());
        e.setCnh(updated.getCnh());
        return repository.save(e);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
