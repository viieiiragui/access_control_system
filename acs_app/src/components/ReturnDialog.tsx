import { LogIn } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSystemContext } from '@/contexts/SystemContext';
import { TripCompletionRecord } from '@/types/vehicleSystem';

interface ReturnDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReturnDialog({ isOpen, onClose }: ReturnDialogProps) {
  const { vehicles, returnData, registerReturn } = useSystemContext();

  const [formData, setFormData] = useState<TripCompletionRecord>({
    licensePlate: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        licensePlate: returnData?.licensePlate || '',
      });
    }
  }, [isOpen, returnData]);

  function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();

      registerReturn(formData);
      toast.success('Retorno registrado!');
      onClose();
    } catch {
      toast.error(
        'Houve um erro ao registrar o retorno. Contate o administrador.'
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Entrada</DialogTitle>
          <DialogDescription>
            Selecione a placa do veículo que retornou.
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
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button form="departure-form" type="submit" variant="success">
            <LogIn className="h-3 w-3 mr-1" />
            Registrar Entrada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
