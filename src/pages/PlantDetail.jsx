import { useState } from 'react';
import {
  ArrowLeft,
  Droplets,
  Sun,
  Thermometer,
  FlaskConical,
  Scissors,
  HeartPulse,
  Camera,
  ChevronRight,
  Pencil,
  Share2,
  Notebook,
} from 'lucide-react';
import WeeklySchedule from '../components/WeeklySchedule';

function HealthRing({ health, size = 72 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (health / 100) * circumference;
  const color =
    health >= 70 ? '#22c55e' : health >= 40 ? '#fb923c' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-lg font-bold text-gray-800 dark:text-gray-200">{health}%</span>
    </div>
  );
}

function SunlightBar({ range }) {
  return (
    <div className="mt-4">
      <p className="text-[11px] font-semibold tracking-wide text-leaf-600 dark:text-leaf-400 mb-2">
        SUNLIGHT INTENSITY RANGE
      </p>
      <div className="relative h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${range[0]}%`,
            width: `${range[1] - range[0]}%`,
            background: 'linear-gradient(90deg, #fde68a, #4ade80, #22c55e)',
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400 dark:text-gray-500">LOW</span>
        <span className="text-[10px] text-leaf-600 dark:text-leaf-400 font-medium">BRIGHT INDIRECT (IDEAL)</span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">DIRECT</span>
      </div>
    </div>
  );
}

function CareTab({ plant, activeTab }) {
  if (activeTab === 'watering') {
    return (
      <div>
        <div className="bg-leaf-50 dark:bg-leaf-900/20 rounded-xl p-4 mb-4 flex items-start gap-3">
          <div className="w-6 h-6 bg-leaf-500 rounded-full flex items-center justify-center mt-0.5 shrink-0">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Frequency: {plant.watering.frequency}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{plant.watering.tip}</p>
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-lg p-4">
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">EXPERT TIP</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{plant.expertTip}</p>
        </div>
        <SunlightBar range={plant.sunlight.range} />
      </div>
    );
  }

  if (activeTab === 'sunlight') {
    return (
      <div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Ideal: {plant.sunlight.ideal}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current: {plant.sunlight.current}</p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Hours per day</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{plant.sunlight.hoursPerDay}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{plant.sunlight.tip}</p>
        <SunlightBar range={plant.sunlight.range} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Temperature: {plant.climate.temperature}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Humidity: {plant.climate.humidity}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Current Temp</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{plant.climate.currentTemp}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">Humidity</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{plant.climate.currentHumidity}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{plant.climate.tip}</p>
    </div>
  );
}

export default function PlantDetail({ plant, onBack }) {
  const [activeTab, setActiveTab] = useState('watering');

  const tabs = [
    { id: 'watering', label: 'WATERING', icon: Droplets },
    { id: 'sunlight', label: 'SUNLIGHT', icon: Sun },
    { id: 'climate', label: 'CLIMATE', icon: Thermometer },
  ];

  const actions = [
    { label: 'Log Watering', icon: Droplets, primary: true },
    { label: 'Add Fertilizer', icon: FlaskConical },
    { label: 'Log Pruning', icon: Scissors },
    { label: 'Check Health', icon: HeartPulse },
  ];

  const statusLabel =
    plant.status === 'thriving'
      ? 'THRIVING'
      : plant.status === 'needs-water'
        ? 'NEEDS WATER'
        : 'STABLE';
  const statusColor =
    plant.status === 'thriving'
      ? 'bg-leaf-100 text-leaf-700 dark:bg-leaf-900/40 dark:text-leaf-400'
      : plant.status === 'needs-water'
        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400';

  return (
    <div className="flex">
      <main className="flex-1 pr-[288px]">
        <div className="px-8 py-6">
          {/* Header with back + breadcrumb */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <button onClick={onBack} className="text-leaf-600 dark:text-leaf-400 hover:text-leaf-700 dark:hover:text-leaf-300 cursor-pointer">
                My Collection
              </button>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <span className="text-gray-500 dark:text-gray-400">{plant.name}</span>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: Plant image + info */}
            <div className="col-span-4">
              <div className="relative rounded-2xl overflow-hidden bg-leaf-50 dark:bg-gray-800">
                <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full z-[1] ${statusColor}`}>
                  {statusLabel}
                </span>
                <img src={plant.image} alt={plant.name} className="w-full aspect-[3/4] object-cover" />
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-leaf-500 rounded-full flex items-center justify-center shadow-lg hover:bg-leaf-600 transition-colors cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="mt-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{plant.name}</h1>
                    <p className="text-sm text-leaf-600 dark:text-leaf-400">{plant.nickname}</p>
                  </div>
                  <HealthRing health={plant.health} />
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 text-right -mt-1">HEALTH</p>

                <div className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-500">Added to collection</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{plant.addedAgo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-500">Plant Age</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{plant.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-500">Last Repotted</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{plant.lastRepotted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-500">Location</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{plant.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center gap-1">
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Details
                  </button>
                  <button className="bg-leaf-500 hover:bg-leaf-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Center: Care tabs + Journal */}
            <div className="col-span-5 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="flex border-b border-gray-100 dark:border-gray-800">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 text-xs font-semibold tracking-wide flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                          active
                            ? 'text-leaf-600 dark:text-leaf-400 border-b-2 border-leaf-500'
                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${active ? 'text-leaf-500' : 'text-gray-300 dark:text-gray-600'}`} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
                <div className="p-5">
                  <CareTab plant={plant} activeTab={activeTab} />
                </div>
              </div>

              {/* Growth Journal */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Notebook className="w-4 h-4 text-leaf-500" />
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">Growth Journal</h3>
                  </div>
                  <button className="text-xs text-leaf-600 dark:text-leaf-400 font-medium hover:text-leaf-700 dark:hover:text-leaf-300 cursor-pointer">
                    View All
                  </button>
                </div>

                <div className="relative pl-4">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-4">
                    {plant.journal.map((entry, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[9px] top-3 w-2.5 h-2.5 rounded-full bg-leaf-500 border-2 border-white dark:border-gray-900" />
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 ml-4">
                          <p className="text-[10px] text-leaf-600 dark:text-leaf-400 font-medium">{entry.date}</p>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{entry.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{entry.description}</p>
                          {entry.image && (
                            <img src={entry.image} alt="" className="mt-2 w-16 h-12 object-cover rounded-lg" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Actions + Stats */}
            <div className="col-span-3 space-y-6">
              <div className="bg-leaf-700 rounded-xl p-5">
                <h3 className="font-bold text-white mb-4">Care Actions</h3>
                <div className="space-y-2.5">
                  {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          action.primary
                            ? 'bg-leaf-500 hover:bg-leaf-400 text-white'
                            : 'bg-leaf-600 hover:bg-leaf-500 text-leaf-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          {action.label}
                        </div>
                        {action.primary && <ChevronRight className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-leaf-600 rounded-xl p-4">
                <p className="text-[10px] font-bold text-leaf-200 tracking-wide mb-3">UPCOMING TASKS</p>
                <div className="bg-leaf-500/50 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-leaf-400 rounded-lg flex items-center justify-center">
                    <FlaskConical className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Fertilizer Due</p>
                    <p className="text-[10px] text-leaf-200">
                      {plant.fertilizer.nextDate} &bull; {plant.fertilizer.formula}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <HeartPulse className="w-4 h-4 text-leaf-500" />
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Care Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{plant.stats.waters}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">WATERS</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{plant.stats.repots}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">REPOTS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <WeeklySchedule />
    </div>
  );
}
