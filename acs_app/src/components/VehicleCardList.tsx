import { Car, LogIn, LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Vehicle } from '@/types/vehicleSystem';
import { VehicleStatusBadge } from './VehicleStatusBadge';

interface VehicleCardListProps {
  vehicles: Vehicle[];
  onDeparture: (vehicleId: number) => void;
  onReturn: (vehicleId: number) => void;
}

export function VehicleCardList({
  vehicles,
  onDeparture,
  onReturn,
}: VehicleCardListProps) {
  return (
    <div className="space-y-4">
      {vehicles.map(vehicle => {
        return (
          <Card key={vehicle.id} className="animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="font-mono font-bold">
                    {vehicle.licensePlate}
                  </span>
                </CardTitle>
                <VehicleStatusBadge vehicle={vehicle} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Modelo</p>
                  <p className="font-medium">{vehicle.model}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {vehicle.status === 'NO_PATIO' ? (
                  <Button
                    size="sm"
                    onClick={() => onDeparture(vehicle.id)}
                    className="bg-warning text-warning-foreground hover:bg-warning/90"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Saída
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => onReturn(vehicle.id)}
                  >
                    <LogIn className="h-3 w-3 mr-1" />
                    Retorno
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
