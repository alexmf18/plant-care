import { LayoutDashboard, Grid3X3, Calendar, Settings, Plus, Leaf } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Grid3X3, label: 'My Collection', id: 'collection' },
  { icon: Calendar, label: 'Schedule', id: 'schedule' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ activePage, onNavigate, onAddPlant }) {
  return (
    <aside className="w-56 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col h-screen fixed left-0 top-0 z-10 transition-colors duration-300">
      <div className="p-5 flex items-center gap-2">
        <div className="w-9 h-9 bg-leaf-500 rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100">LeafCare</h1>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">Plant Parent Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors cursor-pointer ${
                active
                  ? 'bg-leaf-50 dark:bg-leaf-900/30 text-leaf-700 dark:text-leaf-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3">
        <button
          onClick={onAddPlant}
          className="w-full flex items-center justify-center gap-2 bg-leaf-500 hover:bg-leaf-600 text-white py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Plant
        </button>
      </div>
    </aside>
  );
}
