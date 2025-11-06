'use client';

import { Server, Database, Activity, Shield } from 'lucide-react';

export default function SystemOverview({ stats }) {
  const cards = [
    {
      title: 'Active Shards',
      value: stats.activeShards,
      total: stats.totalShards,
      icon: Server,
      color: 'green',
    },
    {
      title: 'L1 Validators',
      value: stats.activeValidators,
      total: stats.totalValidators,
      icon: Shield,
      color: 'blue',
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions,
      icon: Activity,
      color: 'purple',
    },
    {
      title: 'L1 Block Height',
      value: stats.blockHeight?.toLocaleString(),
      icon: Database,
      color: 'orange',
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(card.color)}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">{card.value || 0}</p>
                {card.total && (
                  <p className="text-lg text-gray-500">/ {card.total}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}