import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  FlaskConical,
  Scissors,
  MapPin,
  CalendarDays,
  Clock,
  Leaf,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getTaskIcon(type) {
  switch (type) {
    case 'water': return <Droplets className="w-4 h-4" />;
    case 'fertilize': return <FlaskConical className="w-4 h-4" />;
    case 'prune': return <Scissors className="w-4 h-4" />;
    default: return <Leaf className="w-4 h-4" />;
  }
}

function getTaskColor(type) {
  switch (type) {
    case 'water':
      return { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-600 dark:text-blue-400', icon: 'bg-blue-500', dot: 'bg-blue-500' };
    case 'fertilize':
      return { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', text: 'text-orange-600 dark:text-orange-400', icon: 'bg-orange-500', dot: 'bg-orange-500' };
    case 'prune':
      return { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-600 dark:text-purple-400', icon: 'bg-purple-500', dot: 'bg-purple-500' };
    default:
      return { bg: 'bg-leaf-50 dark:bg-leaf-900/20', border: 'border-leaf-200 dark:border-leaf-800', text: 'text-leaf-600 dark:text-leaf-400', icon: 'bg-leaf-500', dot: 'bg-leaf-500' };
  }
}

function getTaskLabel(type) {
  switch (type) {
    case 'water': return 'Water';
    case 'fertilize': return 'Fertilize';
    case 'prune': return 'Prune';
    default: return 'Care';
  }
}

function generateTasksForMonth(plants, year, month) {
  const tasks = {};
  const addTask = (day, task) => {
    const key = `${year}-${month}-${day}`;
    if (!tasks[key]) tasks[key] = [];
    tasks[key].push(task);
  };
  const today = new Date();
  const todayDate = today.getDate();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  plants.forEach((plant) => {
    const wateringText = plant.watering.nextWatering.toLowerCase();
    let waterDay = null;
    if (wateringText.includes('overdue')) { if (isCurrentMonth) waterDay = todayDate; }
    else if (wateringText.includes('tomorrow')) { if (isCurrentMonth) waterDay = todayDate + 1; }
    else if (wateringText.includes('due today')) { if (isCurrentMonth) waterDay = todayDate; }
    else { const match = wateringText.match(/in (\d+) day/); if (match && isCurrentMonth) waterDay = todayDate + parseInt(match[1]); }

    if (waterDay) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      if (waterDay >= 1 && waterDay <= daysInMonth) {
        addTask(waterDay, { id: `water-${plant.id}-${waterDay}`, type: 'water', plant: plant.name, plantImage: plant.image, location: plant.location, frequency: plant.watering.frequency, urgent: plant.watering.status === 'overdue' });
      }
      const freqMatch = plant.watering.frequency.match(/(\d+)/);
      if (freqMatch) {
        const interval = parseInt(freqMatch[1]);
        let nextDay = waterDay + interval;
        while (nextDay <= new Date(year, month + 1, 0).getDate()) {
          addTask(nextDay, { id: `water-${plant.id}-${nextDay}`, type: 'water', plant: plant.name, plantImage: plant.image, location: plant.location, frequency: plant.watering.frequency, urgent: false });
          nextDay += interval;
        }
      }
    }

    const fertText = plant.fertilizer.nextDate.toLowerCase();
    let fertDay = null;
    if (fertText.includes('due today')) { if (isCurrentMonth) fertDay = todayDate; }
    else if (fertText.includes('in 2 days')) { if (isCurrentMonth) fertDay = todayDate + 2; }
    else if (fertText.includes('in 1 week') || fertText.includes('in a week')) { if (isCurrentMonth) fertDay = todayDate + 7; }
    else {
      const daysMatch = fertText.match(/in (\d+) day/); if (daysMatch && isCurrentMonth) fertDay = todayDate + parseInt(daysMatch[1]);
      const weeksMatch = fertText.match(/in (\d+) week/); if (weeksMatch && isCurrentMonth) fertDay = todayDate + parseInt(weeksMatch[1]) * 7;
    }
    if (fertDay) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      if (fertDay >= 1 && fertDay <= daysInMonth) {
        addTask(fertDay, { id: `fert-${plant.id}-${fertDay}`, type: 'fertilize', plant: plant.name, plantImage: plant.image, location: plant.location, frequency: plant.fertilizer.frequency, formula: plant.fertilizer.formula, urgent: plant.fertilizer.status === 'due' });
      }
    }
  });
  return tasks;
}

function CalendarGrid({ year, month, tasks, selectedDay, onSelectDay }) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let startIdx = firstDay.getDay() - 1;
  if (startIdx < 0) startIdx = 6;
  const today = new Date();
  const isToday = (day) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  const cells = [];
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startIdx - 1; i >= 0; i--) cells.push({ day: prevMonthDays - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, current: false });
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-gray-400 dark:text-gray-500 tracking-wide">{d}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 border-b border-gray-50 dark:border-gray-800/50 last:border-b-0">
          {week.map((cell, ci) => {
            const key = `${year}-${month}-${cell.day}`;
            const dayTasks = cell.current ? (tasks[key] || []) : [];
            const selected = cell.current && selectedDay === cell.day;
            const todayCell = cell.current && isToday(cell.day);
            const hasUrgent = dayTasks.some((t) => t.urgent);
            const taskTypes = [...new Set(dayTasks.map((t) => t.type))];
            return (
              <button
                key={ci}
                onClick={() => cell.current && onSelectDay(cell.day)}
                disabled={!cell.current}
                className={`relative min-h-[72px] p-1.5 text-left transition-all cursor-pointer border-r border-gray-50 dark:border-gray-800/50 last:border-r-0 ${
                  !cell.current ? 'bg-gray-50/50 dark:bg-gray-950/50 cursor-default'
                    : selected ? 'bg-leaf-50 dark:bg-leaf-900/20 ring-2 ring-inset ring-leaf-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  !cell.current ? 'text-gray-300 dark:text-gray-700'
                    : todayCell ? 'bg-leaf-500 text-white'
                      : selected ? 'text-leaf-700 dark:text-leaf-400 font-bold'
                        : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {cell.day}
                </span>
                {taskTypes.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5 px-0.5">
                    {taskTypes.slice(0, 3).map((type) => {
                      const color = getTaskColor(type);
                      return <div key={type} className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />;
                    })}
                  </div>
                )}
                <div className="mt-0.5 space-y-0.5">
                  {dayTasks.slice(0, 2).map((task) => {
                    const color = getTaskColor(task.type);
                    return (
                      <div key={task.id} className={`text-[8px] leading-tight font-medium px-1 py-0.5 rounded ${color.bg} ${color.text} truncate`}>
                        {getTaskLabel(task.type)} {task.plant.split(' ')[0]}
                      </div>
                    );
                  })}
                  {dayTasks.length > 2 && <div className="text-[8px] text-gray-400 dark:text-gray-600 px-1">+{dayTasks.length - 2} more</div>}
                </div>
                {hasUrgent && <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function TaskCard({ task }) {
  const color = getTaskColor(task.type);
  return (
    <div className={`${color.bg} border ${color.border} rounded-xl p-4 transition-all hover:shadow-sm`}>
      <div className="flex items-start gap-3">
        <img src={task.plantImage} alt="" className="w-11 h-11 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 ${color.icon} rounded-md flex items-center justify-center text-white`}>{getTaskIcon(task.type)}</div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{getTaskLabel(task.type)} {task.plant}</h4>
            {task.urgent && (
              <span className="shrink-0 flex items-center gap-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" />Urgent
              </span>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{task.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{task.frequency}</span>
            {task.formula && <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" />{task.formula}</span>}
          </div>
        </div>
        <button className="shrink-0 p-1.5 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg transition-colors cursor-pointer">
          <CheckCircle2 className={`w-5 h-5 ${color.text}`} />
        </button>
      </div>
    </div>
  );
}

function MonthStats({ tasks }) {
  const allTasks = Object.values(tasks).flat();
  const waterCount = allTasks.filter((t) => t.type === 'water').length;
  const fertCount = allTasks.filter((t) => t.type === 'fertilize').length;
  const urgentCount = allTasks.filter((t) => t.urgent).length;
  const stats = [
    { label: 'Total Tasks', value: allTasks.length, color: 'text-leaf-600 dark:text-leaf-400', bg: 'bg-leaf-50 dark:bg-leaf-900/20' },
    { label: 'Waterings', value: waterCount, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Fertilizations', value: fertCount, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Urgent', value: urgentCount, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function UpcomingList({ tasks, year, month }) {
  const today = new Date();
  const todayDate = today.getDate();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const upcoming = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = isCurrentMonth ? todayDate : 1;
  for (let d = startDay; d <= daysInMonth; d++) {
    const key = `${year}-${month}-${d}`;
    const dayTasks = tasks[key];
    if (dayTasks && dayTasks.length > 0) {
      const dayDate = new Date(year, month, d);
      const label = isCurrentMonth && d === todayDate ? 'Today'
        : isCurrentMonth && d === todayDate + 1 ? 'Tomorrow'
          : dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      upcoming.push({ day: d, label, tasks: dayTasks });
    }
  }
  if (upcoming.length === 0) {
    return (
      <div className="text-center py-8">
        <CalendarDays className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
        <p className="text-sm text-gray-400 dark:text-gray-500">No upcoming tasks this month</p>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      {upcoming.slice(0, 8).map((group) => (
        <div key={group.day}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold text-leaf-600 dark:text-leaf-400 tracking-wide">{group.label.toUpperCase()}</span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            <span className="text-[11px] text-gray-400 dark:text-gray-500">{group.tasks.length} task{group.tasks.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-2">
            {group.tasks.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SchedulePage({ plants }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [filterType, setFilterType] = useState('all');
  const tasks = useMemo(() => generateTasksForMonth(plants, year, month), [plants, year, month]);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); setSelectedDay(1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); setSelectedDay(1); };
  const goToday = () => { setYear(today.getFullYear()); setMonth(today.getMonth()); setSelectedDay(today.getDate()); };

  const selectedKey = `${year}-${month}-${selectedDay}`;
  const selectedTasks = (tasks[selectedKey] || []).filter((t) => filterType === 'all' || t.type === filterType);
  const selectedDate = new Date(year, month, selectedDay);
  const selectedLabel = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === selectedDay;
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'water', label: 'Watering' },
    { id: 'fertilize', label: 'Fertilizer' },
    { id: 'prune', label: 'Pruning' },
  ];

  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Care Schedule</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Plan and track all your plant care tasks</p>
        </div>
        <button onClick={goToday} className="px-4 py-2 bg-leaf-500 hover:bg-leaf-600 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />Today
        </button>
      </div>

      <MonthStats tasks={tasks} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{MONTH_NAMES[month]} {year}</h2>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
              <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
            </div>
          </div>
          <CalendarGrid year={year} month={month} tasks={tasks} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-[10px] text-gray-500 dark:text-gray-400">Watering</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500" /><span className="text-[10px] text-gray-500 dark:text-gray-400">Fertilizer</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500" /><span className="text-[10px] text-gray-500 dark:text-gray-400">Pruning</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[10px] text-gray-500 dark:text-gray-400">Urgent</span></div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">{selectedLabel}</h3>
                {isToday && <span className="text-[10px] text-leaf-600 dark:text-leaf-400 font-medium">Today</span>}
              </div>
              <div className="flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                {filters.map((f) => (
                  <button key={f.id} onClick={() => setFilterType(f.id)} className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors cursor-pointer ${
                    filterType === f.id ? 'bg-leaf-100 dark:bg-leaf-900/30 text-leaf-700 dark:text-leaf-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
                  }`}>{f.label}</button>
                ))}
              </div>
            </div>

            {selectedTasks.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-8 text-center">
                <CalendarDays className="w-8 h-8 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
                <p className="text-sm text-gray-400 dark:text-gray-500">No tasks for this day</p>
                <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-1">Select another day or check the upcoming list</p>
              </div>
            ) : (
              <div className="space-y-2.5">{selectedTasks.map((task) => <TaskCard key={task.id} task={task} />)}</div>
            )}

            <div className="mt-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-3">Upcoming This Month</h3>
              <UpcomingList tasks={tasks} year={year} month={month} plants={plants} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
