import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import PlantCard from './PlantCard';

export default function PlantCollection({ plants, onSelectPlant }) {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'View All' },
    { id: 'needs-water', label: 'Needs Water' },
    { id: 'thriving', label: 'Thriving' },
    { id: 'fertilize', label: 'Fertilize Due' },
  ];

  const filtered =
    filter === 'all'
      ? plants
      : filter === 'needs-water'
        ? plants.filter((p) => p.watering.status === 'overdue')
        : filter === 'fertilize'
          ? plants.filter((p) => p.fertilizer.status === 'due')
          : plants.filter((p) => p.status === filter);

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Collection</h2>
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-leaf-100 dark:bg-leaf-900/30 text-leaf-700 dark:text-leaf-400 border border-leaf-200 dark:border-leaf-800'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
          <button className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {filtered.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onSelect={onSelectPlant} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
          No plants match the current filter.
        </div>
      )}
    </section>
  );
}
