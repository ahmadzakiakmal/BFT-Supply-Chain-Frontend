'use client';

import { Activity, TrendingUp, Clock } from 'lucide-react';

export default function LiveMetrics({ metrics }) {
  const metricCards = [
    {
      label: 'Avg Response Time',
      value: `${metrics.avgResponseTime || 0}ms`,
      icon: Clock,
      trend: metrics.responseTimeTrend,
    },
    {
      label: 'Sessions/Hour',
      value: metrics.sessionsPerHour || 0,
      icon: Activity,
      trend: metrics.sessionsTrend,
    },
    {
      label: 'Throughput',
      value: `${metrics.throughput || 0} tx/s`,
      icon: TrendingUp,
      trend: metrics.throughputTrend,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Live Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-gray-600" />
                {metric.trend !== undefined && (
                  <span className={`text-xs font-semibold ${
                    metric.trend > 0 ? 'text-green-600' : metric.trend < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend > 0 ? '↑' : metric.trend < 0 ? '↓' : '→'} {Math.abs(metric.trend)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}