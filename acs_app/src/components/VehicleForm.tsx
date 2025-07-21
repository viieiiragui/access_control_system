import { Car, Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSystemContext } from '@/contexts/SystemContext';

export function VehicleForm() {
  const { addVehicle } = useSystemContext();

  const [formData, setFormData] = useState({
    licensePlate: '',
    model: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addVehicle(formData);
    toast.success('Veículo Cadastrado');

    setFormData({
      licensePlate: '',
      model: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Cadastrar Novo Veículo
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Placa *</Label>
              <Input
                id="licensePlate"
                placeholder="ABC-1234"
                value={formData.licensePlate}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    licensePlate: e.target.value,
                  }))
                }
                required
                className="uppercase"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                placeholder="Civic"
                value={formData.model}
                onChange={e =>
                  setFormData(prev => ({ ...prev, model: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            <Car className="h-4 w-4 mr-2" />
            Cadastrar Veículo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
