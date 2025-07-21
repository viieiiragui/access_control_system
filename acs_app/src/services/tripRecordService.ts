import { TripRecord } from '@/types/vehicleSystem';

const API_URL = import.meta.env.VITE_API_URL;

interface TripRecordModel {
  id: number;
  idVeiculo: number;
  idMotorista: number;
  destino: string;
  passageiros: string;
  dataSaida: Date;
  dataRetorno?: Date;
}

export interface CreateTripRequest {
  placa_veiculo: string;
  id_motorista: number;
  destino: string;
  passageiros?: string;
}

export interface CompleteTripRequest {
  placa_veiculo: string;
}

class TripRecordService {
  async getAllTrips(): Promise<TripRecord[]> {
    const response = await fetch(`${API_URL}/registros`);
    if (!response.ok) {
      throw new Error('Failed to fetch trip records');
    }
    const tripRecords: TripRecordModel[] = await response.json();
    return tripRecords.map(
      record =>
        ({
          id: record.id,
          vehicleId: record.idVeiculo,
          employeeId: record.idMotorista,
          destination: record.destino,
          passengers: record.passageiros,
          departureTime: new Date(record.dataSaida),
          returnTime: record.dataRetorno ? new Date(record.dataRetorno) : null,
        }) as TripRecord
    );
  }

  async createTripRecord(data: CreateTripRequest): Promise<TripRecord> {
    const response = await fetch(`${API_URL}/viagens/saida`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create trip record');
    }
    return response.json();
  }

  async completeTripRecord(data: CompleteTripRequest): Promise<TripRecord> {
    const response = await fetch(`${API_URL}/viagens/retorno`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to complete trip record');
    }
    return response.json();
  }
}

export const tripRecordService = new TripRecordService();
