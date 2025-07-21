import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  CreateEmployeeRequest,
  employeeService,
} from '@/services/employeeService';
import {
  CompleteTripRequest,
  CreateTripRequest,
  tripRecordService,
} from '@/services/tripRecordService';
import {
  CreateVehicleRequest,
  vehicleService,
} from '@/services/vehicleService';
import type {
  CreateTripRecord,
  DashboardStats,
  Employee,
  TripCompletionRecord,
  TripRecord,
  Vehicle,
} from '@/types/vehicleSystem';

export interface SystemContextType {
  vehicles: Vehicle[];
  employees: Employee[];
  trips: TripRecord[];
  departureData: Partial<CreateTripRecord> | null;
  returnData: TripCompletionRecord | null;
  stats: DashboardStats;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'status'>) => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  registerDeparture: (tripRecord: CreateTripRecord) => Promise<void>;
  registerReturn: (tripRecord: TripCompletionRecord) => Promise<void>;
  handleOpenDepartureDialog: (data: Partial<CreateTripRecord>) => void;
  handleCloseDepartureDialog: () => void;
  handleOpenReturnDialog: (data: TripCompletionRecord) => void;
  handleCloseReturnDialog: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: vehicles, refetch: refetchVehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => vehicleService.getAllVehicles(),
    initialData: [],
  });
  const { data: employees, refetch: refetchEmployees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeService.getAllEmployees(),
    initialData: [],
  });
  const { data: trips, refetch: refetchTrips } = useQuery({
    queryKey: ['trips'],
    queryFn: () => tripRecordService.getAllTrips(),
    initialData: [],
  });

  const [departureData, setDepartureData] =
    useState<Partial<CreateTripRecord> | null>(null);
  const [returnData, setReturnData] = useState<TripCompletionRecord | null>(
    null
  );

  const stats = useMemo(
    (): DashboardStats => ({
      totalVehicles: vehicles.length,
      vehiclesInTravel: vehicles.filter(v => v.status === 'EM_VIAGEM').length,
      vehiclesParked: vehicles.filter(v => v.status === 'NO_PATIO').length,
      todayDepartures: trips.filter(
        trip =>
          trip.returnTime === null &&
          new Date(trip.departureTime).toDateString() ===
            new Date().toDateString()
      ).length,
      todayReturns: trips.filter(
        trip =>
          trip.returnTime !== null &&
          new Date(trip.returnTime).toDateString() === new Date().toDateString()
      ).length,
    }),
    [vehicles, trips]
  );

  const addVehicle = useCallback(
    async (vehicle: Omit<Vehicle, 'id' | 'status'>) => {
      const formData: CreateVehicleRequest = {
        placa: vehicle.licensePlate,
        modelo: vehicle.model,
      };
      await vehicleService.createVehicle(formData);
      refetchVehicles();
    },
    [refetchVehicles]
  );

  const addEmployee = useCallback(
    async (employee: Omit<Employee, 'id'>) => {
      const formData: CreateEmployeeRequest = {
        nome: employee.name,
        cnh: employee.cnh,
      };
      await employeeService.createEmployee(formData);
      refetchEmployees();
    },
    [refetchEmployees]
  );

  const registerDeparture = useCallback(
    async (tripRecord: CreateTripRecord) => {
      const formData: CreateTripRequest = {
        placa_veiculo: tripRecord.licensePlate,
        id_motorista: tripRecord.employeeId,
        destino: tripRecord.destination,
        passageiros: tripRecord.passengers,
      };
      await tripRecordService.createTripRecord(formData);
      refetchTrips();
      refetchVehicles();
    },
    [refetchTrips, refetchVehicles]
  );

  const registerReturn = useCallback(
    async (tripRecord: CreateTripRecord) => {
      const formData: CompleteTripRequest = {
        placa_veiculo: tripRecord.licensePlate,
      };
      await tripRecordService.completeTripRecord(formData);
      refetchTrips();
      refetchVehicles();
    },
    [refetchTrips, refetchVehicles]
  );

  const handleOpenDepartureDialog = useCallback(
    (data: Partial<CreateTripRecord>) => {
      setDepartureData(data);
    },
    []
  );

  const handleCloseDepartureDialog = useCallback(() => {
    setDepartureData(null);
  }, []);

  const handleOpenReturnDialog = useCallback((data: TripCompletionRecord) => {
    setReturnData(data);
  }, []);

  const handleCloseReturnDialog = useCallback(() => {
    setReturnData(null);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        vehicles,
        employees,
        trips,
        departureData,
        returnData,
        stats,
        addVehicle,
        addEmployee,
        registerDeparture,
        registerReturn,
        handleOpenDepartureDialog,
        handleCloseDepartureDialog,
        handleOpenReturnDialog,
        handleCloseReturnDialog,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystemContext = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystemContext must be used within a SystemProvider');
  }
  return context;
};
