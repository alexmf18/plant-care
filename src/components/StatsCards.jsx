import { Sprout, Droplets, FlaskConical, TrendingUp } from 'lucide-react';

export default function StatsCards({ plants }) {
  const thriving = plants.filter((p) => p.status === 'thriving').length;
  const needsWater = plants.filter(
    (p) => p.watering.status === 'overdue' || p.watering.status === 'upcoming'
  ).length;
  const fertilizerDue = plants.filter(
    (p) => p.fertilizer.status === 'due'
  ).length;

  const stats = [
    {
      label: 'PLANTS THRIVING',
      value: plants.length,
      icon: Sprout,
      iconColor: 'text-leaf-500',
      sub: '+20% from last month',
      subIcon: TrendingUp,
      subColor: 'text-leaf-500',
    },
    {
      label: 'WATER NEEDED',
      value: needsWater,
      icon: Droplets,
      iconColor: 'text-blue-400',
      sub: 'Action required today',
      subColor: 'text-blue-500',
    },
    {
      label: 'FERTILIZER DUE',
      value: fertilizerDue,
      icon: FlaskConical,
      iconColor: 'text-orange-400',
      sub: 'Scheduled for today',
      subColor: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const SubIcon = stat.subIcon;
        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold tracking-wide text-leaf-600 dark:text-leaf-400">
                {stat.label}
              </span>
              <Icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</p>
            <div className="flex items-center gap-1">
              {SubIcon && <SubIcon className={`w-3 h-3 ${stat.subColor}`} />}
              <span className={`text-xs ${stat.subColor}`}>{stat.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
