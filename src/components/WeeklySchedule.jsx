import { CalendarDays, Droplets, Scissors, FlaskConical, Lightbulb } from 'lucide-react';
import { schedule, quickTips } from '../data/plants';
import { useState } from 'react';

function getTaskIcon(type) {
  switch (type) {
    case 'water':
      return <Droplets className="w-4 h-4 text-white" />;
    case 'fertilize':
      return <FlaskConical className="w-4 h-4 text-white" />;
    case 'prune':
      return <Scissors className="w-4 h-4 text-white" />;
    default:
      return <Droplets className="w-4 h-4 text-white" />;
  }
}

function getTaskBg(type, urgency) {
  if (urgency === 'urgent') return 'bg-blue-500';
  switch (type) {
    case 'water':
      return 'bg-blue-400';
    case 'fertilize':
      return 'bg-orange-400';
    case 'prune':
      return 'bg-gray-400';
    default:
      return 'bg-leaf-500';
  }
}

export default function WeeklySchedule() {
  const [tipIndex] = useState(Math.floor(Math.random() * quickTips.length));

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 p-5 h-screen fixed right-0 top-0 overflow-y-auto transition-colors duration-300">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">Weekly Schedule</h2>
        <CalendarDays className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="space-y-5">
        {schedule.map((day) => (
          <div key={day.day}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-leaf-600 dark:text-leaf-400 tracking-wide">
                {day.day}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">{day.date}</span>
            </div>
            {day.tasks.length === 0 ? (
              <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center">
                <p className="text-xs text-leaf-500 dark:text-leaf-400 italic">No tasks scheduled</p>
              </div>
            ) : (
              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-xl p-3 ${
                      task.urgency === 'urgent'
                        ? 'bg-leaf-600 text-white'
                        : 'bg-leaf-50 dark:bg-leaf-900/20 border border-leaf-100 dark:border-leaf-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${getTaskBg(task.type, task.urgency)}`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${task.urgency === 'urgent' ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                          {task.type === 'water' && 'Water '}
                          {task.type === 'fertilize' && 'Fertilize '}
                          {task.type === 'prune' && 'Prune '}
                          {task.plant}
                        </p>
                        <p className={`text-[10px] ${task.urgency === 'urgent' ? 'text-green-100' : 'text-gray-400 dark:text-gray-500'}`}>
                          {task.urgency === 'urgent' ? 'Urgent' : 'Scheduled'} &bull; {task.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-leaf-50 dark:bg-leaf-900/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-leaf-500" />
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Quick Tip</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {quickTips[tipIndex]}
        </p>
        <button className="text-xs text-leaf-600 dark:text-leaf-400 font-medium mt-2 hover:text-leaf-700 dark:hover:text-leaf-300 cursor-pointer">
          Learn more
        </button>
      </div>
    </aside>
  );
}
