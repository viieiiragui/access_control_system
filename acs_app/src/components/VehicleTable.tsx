import { Car, LogIn, LogOut } from 'lucide-react';

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
import { useIsMobile } from '@/hooks/use-mobile';
import { VehicleCardList } from './VehicleCardList';
import { VehicleStatusBadge } from './VehicleStatusBadge';

export function VehicleTable() {
  const isMobile = useIsMobile();
  const { vehicles, handleOpenDepartureDialog, handleOpenReturnDialog } =
    useSystemContext();

  if (isMobile) {
    return (
      <VehicleCardList
        vehicles={vehicles}
        onDeparture={() => {}}
        onReturn={() => {}}
      />
    );
  }

  return (
    <div className="rounded-lg border bg-card shadow-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Veículo</TableHead>
            <TableHead className="min-w-[100px]">Placa</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map(vehicle => {
            return (
              <TableRow key={vehicle.id} className="animate-fade-in">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{vehicle.model}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono font-semibold">
                  {vehicle.licensePlate}
                </TableCell>
                <TableCell>
                  <VehicleStatusBadge vehicle={vehicle} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {vehicle.status === 'NO_PATIO' ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleOpenDepartureDialog({
                            licensePlate: vehicle.licensePlate,
                          })
                        }
                        className="bg-warning text-warning-foreground hover:bg-warning/90"
                      >
                        <LogOut className="h-3 w-3 mr-1" />
                        Saída
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() =>
                          handleOpenReturnDialog({
                            licensePlate: vehicle.licensePlate,
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
