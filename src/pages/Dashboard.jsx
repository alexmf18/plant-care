import { Bell } from 'lucide-react';
import StatsCards from '../components/StatsCards';
import PlantCollection from '../components/PlantCollection';
import WeeklySchedule from '../components/WeeklySchedule';

export default function Dashboard({ plants, onSelectPlant }) {
  const attentionCount = plants.filter(
    (p) =>
      p.watering.status === 'overdue' ||
      p.watering.status === 'upcoming' ||
      p.fertilizer.status === 'due'
  ).length;

  return (
    <div className="flex">
      <main className="flex-1 pr-[288px]">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Plant Care Overview
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back! You have{' '}
                <span className="text-leaf-600 dark:text-leaf-400 font-semibold">
                  {attentionCount} plants
                </span>{' '}
                that need attention today.
              </p>
            </div>
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-gray-400" />
              {attentionCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {attentionCount}
                </span>
              )}
            </button>
          </div>

          <StatsCards plants={plants} />
          <PlantCollection plants={plants} onSelectPlant={onSelectPlant} />
        </div>
      </main>
      <WeeklySchedule />
    </div>
  );
}
