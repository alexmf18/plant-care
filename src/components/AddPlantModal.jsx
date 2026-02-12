import { useState } from 'react';
import { X, Leaf, ChevronDown } from 'lucide-react';

const LIGHT_OPTIONS = [
  { value: 'bright-direct', label: 'Bright Direct', icon: 'bright-direct' },
  { value: 'bright-indirect', label: 'Bright Indirect', icon: 'partial-shade' },
  { value: 'indirect', label: 'Indirect Light', icon: 'indirect' },
  { value: 'low-light', label: 'Low Light', icon: 'low-light' },
];

const LOCATION_OPTIONS = [
  'Living Room',
  'Bedroom',
  'Bathroom',
  'Kitchen',
  'Office',
  'Balcony',
];

const WATERING_PRESETS = [
  { value: 'Every 3-5 days', label: 'High (every 3-5 days)' },
  { value: 'Every 7-9 days', label: 'Medium (every 7-9 days)' },
  { value: 'Every 7-14 days', label: 'Moderate (every 7-14 days)' },
  { value: 'Every 14-21 days', label: 'Low (every 14-21 days)' },
];

const FERTILIZER_PRESETS = [
  { value: 'Every 2-4 weeks during growing season', label: 'Frequent (every 2-4 weeks)' },
  { value: 'Monthly during growing season', label: 'Monthly' },
  { value: 'Every 6 weeks', label: 'Every 6 weeks' },
  { value: 'Every 2 months', label: 'Every 2 months' },
];

const PLANT_IMAGES = [
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1593482892580-e32e47e0a39e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572688484438-313a56e6dc34?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1593691509543-c55fb32e1ce4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501004318855-e73e45920d1d?w=400&h=400&fit=crop',
];

export default function AddPlantModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    location: 'Living Room',
    light: 'bright-indirect',
    wateringFrequency: 'Every 7-9 days',
    fertilizerFrequency: 'Monthly during growing season',
    image: PLANT_IMAGES[0],
  });

  const [step, setStep] = useState(1);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const lightOption = LIGHT_OPTIONS.find((o) => o.value === form.light);

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    const sunlightRanges = {
      'bright-direct': [60, 95],
      'bright-indirect': [30, 70],
      indirect: [20, 55],
      'low-light': [5, 35],
    };

    const newPlant = {
      id: Date.now(),
      name: form.name.trim(),
      nickname: form.nickname.trim() || form.name.trim(),
      image: form.image,
      health: 80,
      status: 'ok',
      light: form.light,
      lightLabel: lightOption.label,
      lightIcon: lightOption.icon,
      location: form.location,
      watering: {
        frequency: form.wateringFrequency,
        nextWatering: 'In 7 days',
        lastWatered: 'Just added',
        status: 'ok',
        tip: `Water according to the ${form.wateringFrequency.toLowerCase()} schedule. Check soil moisture before watering.`,
      },
      sunlight: {
        range: sunlightRanges[form.light],
        ideal: lightOption.label,
        current: lightOption.label,
        hoursPerDay: form.light.includes('bright') ? '6-8 hours' : '4-6 hours',
        tip: `This plant prefers ${lightOption.label.toLowerCase()} conditions.`,
      },
      climate: {
        temperature: '18-27°C (65-80°F)',
        humidity: '50-70%',
        currentTemp: '22°C',
        currentHumidity: '55%',
        tip: 'Maintain consistent indoor temperature and humidity.',
      },
      fertilizer: {
        lastDate: 'Not yet',
        nextDate: 'In 2 weeks',
        formula: 'All-Purpose Liquid',
        frequency: form.fertilizerFrequency,
        status: 'ok',
      },
      age: 'New',
      addedAgo: 'Just now',
      lastRepotted: 'Not yet',
      journal: [
        {
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
          title: 'Added to collection',
          description: `${form.name.trim()} has been added to your plant collection!`,
        },
      ],
      stats: { waters: 0, repots: 0 },
      expertTip: 'Observe your new plant for a few weeks to learn its specific needs in your environment.',
    };

    onAdd(newPlant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-black/40 w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-leaf-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add New Plant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= s
                      ? 'bg-leaf-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {s}
                </div>
                <span className={`text-xs font-medium ${step >= s ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>
                  {s === 1 ? 'Basic Info' : 'Care Schedule'}
                </span>
                {s < 2 && <div className={`flex-1 h-px ${step > 1 ? 'bg-leaf-400' : 'bg-gray-200 dark:bg-gray-600'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 1 ? (
            <div className="space-y-4">
              {/* Plant name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Plant Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="e.g., Monstera Deliciosa"
                  className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                />
              </div>

              {/* Nickname */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Nickname
                </label>
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => update('nickname', e.target.value)}
                  placeholder="e.g., Swiss Cheese Plant"
                  className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent cursor-pointer"
                  >
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Light requirement */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Light Requirement
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LIGHT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => update('light', opt.value)}
                      className={`p-3 rounded-xl border text-sm text-left transition-all cursor-pointer ${
                        form.light === opt.value
                          ? 'border-leaf-400 bg-leaf-50 dark:bg-leaf-900/30 text-leaf-700 dark:text-leaf-300 ring-1 ring-leaf-400'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Choose Photo
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PLANT_IMAGES.map((img) => (
                    <button
                      key={img}
                      onClick={() => update('image', img)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        form.image === img
                          ? 'border-leaf-500 ring-2 ring-leaf-300'
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Watering schedule */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Watering Frequency
                </label>
                <div className="space-y-2">
                  {WATERING_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => update('wateringFrequency', preset.value)}
                      className={`w-full p-3 rounded-xl border text-sm text-left transition-all cursor-pointer flex items-center gap-3 ${
                        form.wateringFrequency === preset.value
                          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-400'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        form.wateringFrequency === preset.value
                          ? 'border-blue-500'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {form.wateringFrequency === preset.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        )}
                      </div>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fertilizer schedule */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">
                  Fertilizer Schedule
                </label>
                <div className="space-y-2">
                  {FERTILIZER_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => update('fertilizerFrequency', preset.value)}
                      className={`w-full p-3 rounded-xl border text-sm text-left transition-all cursor-pointer flex items-center gap-3 ${
                        form.fertilizerFrequency === preset.value
                          ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 ring-1 ring-orange-400'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        form.fertilizerFrequency === preset.value
                          ? 'border-orange-500'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {form.fertilizerFrequency === preset.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        )}
                      </div>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary preview */}
              <div className="bg-leaf-50 dark:bg-leaf-900/20 rounded-xl p-4 border border-transparent dark:border-leaf-800/30">
                <p className="text-xs font-bold text-leaf-700 dark:text-leaf-400 mb-2">SUMMARY</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Plant</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{form.name || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Location</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{form.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Light</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{lightOption?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Watering</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{form.wateringFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Fertilizer</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-right max-w-[180px]">{form.fertilizerFrequency}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!form.name.trim()) return;
                  setStep(2);
                }}
                disabled={!form.name.trim()}
                className="px-6 py-2.5 bg-leaf-500 hover:bg-leaf-600 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Next: Care Schedule
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <Leaf className="w-4 h-4" />
                Add to Collection
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
