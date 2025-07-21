export interface Vehicle {
  id: number;
  licensePlate: string;
  model: string;
  status: 'NO_PATIO' | 'EM_VIAGEM';
}

export interface Employee {
  id: number;
  name: string;
  cnh: string;
}

export interface TripRecord {
  id: number;
  vehicleId: number;
  employeeId: number;
  destination: string;
  passengers?: string;
  departureTime: Date;
  returnTime?: Date;
}

export interface CreateTripRecord {
  licensePlate: string;
  employeeId: number;
  destination: string;
  passengers?: string;
}

export interface TripCompletionRecord {
  licensePlate: string;
}

export interface DashboardStats {
  totalVehicles: number;
  vehiclesInTravel: number;
  vehiclesParked: number;
  todayDepartures: number;
  todayReturns: number;
}
