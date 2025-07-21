import { Badge } from '@/components/ui/badge';
import type { Vehicle } from '@/types/vehicleSystem';

interface VehicleStatusBadgeProps {
  vehicle: Vehicle;
}

export function VehicleStatusBadge({ vehicle }: VehicleStatusBadgeProps) {
  const variant = vehicle.status === 'NO_PATIO' ? 'success' : 'warning';
  const statusText = vehicle.status === 'NO_PATIO' ? 'No Pátio' : 'Em Viagem';

  return (
    <Badge variant={variant} className="animate-fade-in">
      {statusText}
    </Badge>
  );
}
