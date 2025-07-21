import { Activity, Car, Menu, Plus, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Activity },
    { id: 'vehicles', label: 'Veículos', icon: Car },
    { id: 'employees', label: 'Funcionários', icon: Users },
    { id: 'register-vehicle', label: 'Cadastrar Veículo', icon: Plus },
    { id: 'register-employee', label: 'Cadastrar Funcionário', icon: Plus },
  ];

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="border-b bg-card shadow-card mb-4 md:mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src="/agt-logo.png"
                alt="AGT Logo"
                className="h-8 md:h-10 w-auto flex-shrink-0"
              />
              <div className="hidden md:block h-8 w-px bg-border"></div>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-primary truncate">
                Sistema de Controle Veicular
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                Portaria e Gerenciamento AGT
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                  size="sm"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/agt-logo.png"
                  alt="AGT Logo"
                  className="h-8 w-auto"
                />
                <div>
                  <h2 className="font-bold text-primary">AGT</h2>
                  <p className="text-sm text-muted-foreground">
                    Sistema Veicular
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      onClick={() => handleTabChange(tab.id)}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
