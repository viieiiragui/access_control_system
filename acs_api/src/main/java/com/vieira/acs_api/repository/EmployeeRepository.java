package com.vieira.acs_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vieira.acs_api.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByCnh(String cnh);
}
