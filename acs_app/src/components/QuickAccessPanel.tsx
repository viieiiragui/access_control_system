import { Car, Search, UserCheck } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export function QuickAccessPanel() {
  const {
    vehicles,
    employees,
    handleOpenDepartureDialog,
    handleOpenReturnDialog,
  } = useSystemContext();

  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [plateSearch, setPlateSearch] = useState('');

  const filteredVehicles = vehicles.filter(v =>
    v.licensePlate.toLowerCase().includes(plateSearch.toLowerCase())
  );

  const selectedVehicleData = vehicles.find(
    v => v.id.toString() === selectedVehicle
  );

  const handleDeparture = () => {
    if (selectedVehicle && selectedEmployee) {
      handleOpenDepartureDialog({
        licensePlate: selectedVehicleData?.licensePlate || '',
        employeeId: Number(selectedEmployee),
      });

      setSelectedVehicle('');
      setSelectedEmployee('');
      setPlateSearch('');
    }
  };

  const handleReturn = () => {
    if (selectedVehicle) {
      handleOpenReturnDialog({
        licensePlate: selectedVehicleData?.licensePlate || '',
      });

      setSelectedVehicle('');
      setPlateSearch('');
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Acesso Rápido - Portaria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plate-search">Buscar por Placa</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="plate-search"
                placeholder="ABC-1234"
                value={plateSearch}
                onChange={e => setPlateSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Veículo</Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o veículo" />
              </SelectTrigger>
              <SelectContent>
                {filteredVehicles.map(vehicle => (
                  <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                    {vehicle.model} - {vehicle.licensePlate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedVehicleData?.status === 'NO_PATIO' && (
            <div className="space-y-2">
              <Label>Funcionário</Label>
              <Select
                value={selectedEmployee}
                onValueChange={setSelectedEmployee}
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
          )}

          <div className="sm:col-span-2 lg:col-span-1 flex items-end">
            {selectedVehicleData?.status === 'NO_PATIO' ? (
              <Button
                onClick={handleDeparture}
                disabled={!selectedVehicle || !selectedEmployee}
                className="w-full bg-warning text-warning-foreground hover:bg-warning/90"
              >
                <span className="hidden sm:inline">Registrar </span>Saída
              </Button>
            ) : selectedVehicleData?.status === 'EM_VIAGEM' ? (
              <Button
                onClick={handleReturn}
                disabled={!selectedVehicle}
                variant="success"
                className="w-full"
              >
                <span className="hidden sm:inline">Registrar </span>Retorno
              </Button>
            ) : (
              <Button disabled className="w-full">
                <span className="hidden sm:inline">Selecione um </span>Veículo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
