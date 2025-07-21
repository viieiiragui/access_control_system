import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSystemContext } from '@/contexts/SystemContext';

export function EmployeeForm() {
  const { addEmployee } = useSystemContext();

  const [formData, setFormData] = useState({
    name: '',
    cnh: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEmployee(formData);
    toast.success('Funcionário Cadastrado');

    setFormData({
      name: '',
      cnh: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Cadastrar Novo Funcionário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                placeholder="João Silva"
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnh">CNH *</Label>
              <Input
                id="cnh"
                placeholder="123.456.789-00"
                value={formData.cnh}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    cnh: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" />
            Cadastrar Funcionário
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
