import { LogOut, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSystemContext } from '@/contexts/SystemContext';
import { CreateTripRecord } from '@/types/vehicleSystem';

interface DepartureDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepartureDialog({ isOpen, onClose }: DepartureDialogProps) {
  const { vehicles, employees, departureData, registerDeparture } =
    useSystemContext();

  const [formData, setFormData] = useState<Partial<CreateTripRecord>>({
    licensePlate: '',
    employeeId: null,
    destination: '',
    passengers: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        licensePlate: departureData?.licensePlate || '',
        employeeId: departureData?.employeeId || null,
        destination: departureData?.destination || '',
        passengers: departureData?.passengers || '',
      });
    }
  }, [isOpen, departureData]);

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();
      await registerDeparture(formData as CreateTripRecord);
      toast.success('Partida registrada!');
      onClose();
    } catch {
      toast.error(
        'Houve um erro ao registrar a partida. Contate o administrador.'
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Partida</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da partida do veículo.
          </DialogDescription>
        </DialogHeader>

        <form id="departure-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Placa *</Label>
              <Select
                value={formData.licensePlate}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, licensePlate: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.licensePlate}>
                      {vehicle.model} - {vehicle.licensePlate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Funcionário *</Label>
              <Select
                value={formData.employeeId?.toString()}
                onValueChange={value =>
                  setFormData(prev => ({ ...prev, employeeId: Number(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem
                      key={employee.id}
                      value={employee.id.toString()}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        {employee.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destino *</Label>
              <Input
                id="destination"
                placeholder="Ex: São Paulo"
                value={formData.destination}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    destination: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers">Passageiros</Label>
              <Input
                id="passengers"
                placeholder="Ex: André, Maria"
                value={formData.passengers}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    passengers: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            form="departure-form"
            type="submit"
            className="bg-warning text-warning-foreground hover:bg-warning/90"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Registrar Saída
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
