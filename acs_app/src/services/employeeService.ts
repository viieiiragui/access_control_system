import type { Employee } from '@/types/vehicleSystem';

const API_URL = import.meta.env.VITE_API_URL;

interface EmployeeModel {
  id: number;
  nome: string;
  cnh: string;
}

export interface CreateEmployeeRequest {
  nome: string;
  cnh: string;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  status?: 'active' | 'inactive';
}

class EmployeeService {
  async getAllEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_URL}/funcionarios`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const employees: EmployeeModel[] = await response.json();
    return employees.map(
      e =>
        ({
          id: e.id,
          name: e.nome,
          cnh: e.cnh,
        }) as Employee
    );
  }

  async createEmployee(employee: CreateEmployeeRequest): Promise<Employee> {
    const response = await fetch(`${API_URL}/funcionarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    return response.json();
  }
}

export const employeeService = new EmployeeService();
