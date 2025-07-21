import { Car, LogIn } from 'lucide-react';
import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSystemContext } from '@/contexts/SystemContext';
import type { Employee, Vehicle } from '@/types/vehicleSystem';

export function HistoryTable() {
  const { vehicles, employees, trips, handleOpenReturnDialog } =
    useSystemContext();

  const mappedVehicles = useMemo((): Record<string, Vehicle> => {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.id] = vehicle;
      return acc;
    }, {});
  }, [vehicles]);

  const mappedEmployees = useMemo((): Record<string, Employee> => {
    return employees.reduce((acc, employee) => {
      acc[employee.id] = employee;
      return acc;
    }, {});
  }, [employees]);

  const parsedTrip = useMemo(() => {
    if (!trips.length) return [];

    return trips.map(trip => ({
      id: trip.id,
      vehicle: mappedVehicles[trip.vehicleId],
      employee: mappedEmployees[trip.employeeId],
      destination: trip.destination,
      departureTime: trip.departureTime,
      returnTime: trip.returnTime,
    }));
  }, [mappedEmployees, mappedVehicles, trips]);

  const formatTime = (date?: Date) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="rounded-lg border bg-card shadow-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Veículo</TableHead>
            <TableHead className="min-w-[100px]">Placa</TableHead>
            <TableHead className="min-w-[120px]">Responsável</TableHead>
            <TableHead className="min-w-[120px]">Destino</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[80px]">Saída</TableHead>
            <TableHead className="min-w-[80px]">Retorno</TableHead>
            <TableHead className="min-w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parsedTrip.map(trip => {
            return (
              <TableRow key={trip.id} className="animate-fade-in">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{trip.vehicle.model}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono font-semibold">
                  {trip.vehicle.licensePlate}
                </TableCell>
                <TableCell>
                  <div
                    className="max-w-[150px] truncate"
                    title={trip.employee.name || '-'}
                  >
                    {trip.employee.name || '-'}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="max-w-[150px] truncate"
                    title={trip.destination || '-'}
                  >
                    {trip.destination || '-'}
                  </div>
                </TableCell>
                <TableCell>
                  {trip.returnTime === null ? (
                    <Badge
                      variant="warning"
                      className="animate-fade-in whitespace-nowrap"
                    >
                      Em Viagem
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="animate-fade-in">
                      Retornado
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {formatTime(trip.departureTime)}
                </TableCell>
                <TableCell className="text-sm">
                  {formatTime(trip.returnTime)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {trip.returnTime === null && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() =>
                          handleOpenReturnDialog({
                            licensePlate: trip.vehicle.licensePlate,
                          })
                        }
                      >
                        <LogIn className="h-3 w-3 mr-1" />
                        Retorno
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
