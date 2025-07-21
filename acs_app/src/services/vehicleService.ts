import type { Vehicle } from '@/types/vehicleSystem';

const API_URL = import.meta.env.VITE_API_URL;

interface VehicleModel {
  id: number;
  placa: string;
  modelo: string;
  status: 'NO_PATIO' | 'EM_VIAGEM';
  createdAt: string;
}

export interface CreateVehicleRequest {
  placa: string;
  modelo: string;
}

class VehicleService {
  async getAllVehicles(): Promise<Vehicle[]> {
    const response = await fetch(`${API_URL}/veiculos`);
    if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
    }
    const vehicles: VehicleModel[] = await response.json();
    return vehicles.map(
      v =>
        ({
          id: v.id,
          licensePlate: v.placa,
          model: v.modelo,
          status: v.status,
        }) as Vehicle
    );
  }

  async createVehicle(vehicle: CreateVehicleRequest): Promise<Vehicle> {
    const response = await fetch(`${API_URL}/veiculos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });
    if (!response.ok) {
      throw new Error('Failed to create vehicle');
    }
    return response.json();
  }
}

export const vehicleService = new VehicleService();
