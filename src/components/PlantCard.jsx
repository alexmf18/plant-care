import { Droplets } from 'lucide-react';

function getLightIcon(lightIcon) {
  const icons = {
    'partial-shade': '🌤',
    'bright-direct': '☀️',
    indirect: '☁️',
    'low-light': '🌑',
  };
  return icons[lightIcon] || '☀️';
}

function HealthRing({ health }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (health / 100) * circumference;
  const color =
    health >= 70
      ? 'stroke-leaf-500'
      : health >= 40
        ? 'stroke-orange-400'
        : 'stroke-red-400';

  return (
    <div className="relative w-11 h-11 flex items-center justify-center">
      <svg className="w-11 h-11 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={radius} fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="3" />
        <circle cx="20" cy="20" r={radius} fill="none" className={color} strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-[11px] font-bold text-gray-700 dark:text-gray-300">
        {health}%
      </span>
    </div>
  );
}

export default function PlantCard({ plant, onSelect }) {
  const isOverdue = plant.watering.status === 'overdue';

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group"
      onClick={() => onSelect(plant.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 text-gray-800 dark:text-gray-200">
          {getLightIcon(plant.lightIcon)} {plant.lightLabel.toUpperCase()}
        </span>
        {isOverdue && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            NEEDS WATER
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{plant.name}</h3>
            <p className="text-xs text-leaf-600 dark:text-leaf-400">{plant.nickname}</p>
          </div>
          <HealthRing health={plant.health} />
        </div>

        <div className="mt-3 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-leaf-600 dark:text-leaf-400">Watering</span>
            <span className={`font-medium ${isOverdue ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
              {plant.watering.nextWatering}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-leaf-600 dark:text-leaf-400">Fertilizer</span>
            <span className={`font-medium ${plant.fertilizer.status === 'due' ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
              {plant.fertilizer.nextDate}
            </span>
          </div>
        </div>

        {isOverdue ? (
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="mt-4 w-full bg-leaf-500 hover:bg-leaf-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Droplets className="w-3.5 h-3.5" />
            Water Now
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(plant.id); }}
            className="mt-4 w-full border border-gray-200 dark:border-gray-700 hover:border-leaf-300 hover:bg-leaf-50 dark:hover:bg-leaf-900/20 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
}
