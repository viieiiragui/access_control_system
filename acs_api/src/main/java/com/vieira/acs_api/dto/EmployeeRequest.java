package com.vieira.acs_api.dto;

import com.vieira.acs_api.model.Employee;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmployeeRequest {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "CNH é obrigatória")
    private String cnh;

    public Employee toEntity() {
        Employee e = new Employee();
        e.setNome(nome);
        e.setCnh(cnh);
        return e;
    }
}
