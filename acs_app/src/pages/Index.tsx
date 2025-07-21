import { useState } from 'react';

import { EmployeeForm } from '@/components/EmployeeForm';
import { EmployeeList } from '@/components/EmployeeList';
import { Navigation } from '@/components/Navigation';
import { VehicleForm } from '@/components/VehicleForm';
import { VehicleTable } from '@/components/VehicleTable';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Controle de Veículos</h2>
            </div>
          </div>
        );

      case 'vehicles':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Gerenciar Veículos</h2>
            <VehicleTable />
          </div>
        );

      case 'employees':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Gerenciar Funcionários</h2>
            <EmployeeList />
          </div>
        );

      case 'register-vehicle':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Cadastro de Veículos</h2>
            <VehicleForm />
          </div>
        );

      case 'register-employee':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Cadastro de Funcionários
            </h2>
            <EmployeeForm />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="container mx-auto px-4 pb-8 max-w-7xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
