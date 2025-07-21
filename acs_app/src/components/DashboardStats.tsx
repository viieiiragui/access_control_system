import { Car, Clock, MapPin, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSystemContext } from '@/contexts/SystemContext';

export function DashboardStats() {
  const { stats } = useSystemContext();

  const statsItems = [
    {
      title: 'Total de Veículos',
      value: stats.totalVehicles,
      icon: Car,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'No Pátio',
      value: stats.vehiclesParked,
      icon: MapPin,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Em Viagem',
      value: stats.vehiclesInTravel,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Movimentações Hoje',
      value: stats.todayDepartures + stats.todayReturns,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsItems.map((item, index) => (
        <Card
          key={item.title}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`rounded-full p-2 ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
