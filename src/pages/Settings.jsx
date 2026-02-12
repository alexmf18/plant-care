import {
  Sun,
  Moon,
  Monitor,
  Type,
  Palette,
  RectangleHorizontal,
  RotateCcw,
  Check,
  Eye,
  Minus,
  Plus,
  PanelLeft,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function SectionCard({ title, description, icon: Icon, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 bg-leaf-100 dark:bg-leaf-900/40 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-leaf-600 dark:text-leaf-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          {description && (
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ThemeSelector({ settings, update }) {
  const themes = [
    { id: 'light', label: 'Light', icon: Sun, desc: 'Clean bright look' },
    { id: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {themes.map((t) => {
        const Icon = t.icon;
        const active = settings.theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => update('theme', t.id)}
            className={`relative p-4 rounded-xl border-2 text-left transition-all cursor-pointer group ${
              active
                ? 'border-leaf-500 bg-leaf-50 dark:bg-leaf-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {active && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-leaf-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                t.id === 'light'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.label}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{t.desc}</p>

            {/* Mini preview */}
            <div
              className={`mt-3 rounded-lg overflow-hidden border ${
                t.id === 'light'
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-gray-900 border-gray-700'
              }`}
            >
              <div className={`h-1.5 ${t.id === 'light' ? 'bg-white' : 'bg-gray-800'} flex gap-1 px-1 pt-1`}>
                <div className="w-1 h-1 rounded-full bg-red-400/60" />
                <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
                <div className="w-1 h-1 rounded-full bg-green-400/60" />
              </div>
              <div className="flex h-8">
                <div className={`w-4 ${t.id === 'light' ? 'bg-white' : 'bg-gray-800'}`} />
                <div className={`flex-1 ${t.id === 'light' ? 'bg-gray-100' : 'bg-gray-950'} p-1`}>
                  <div className={`w-3/4 h-1 rounded ${t.id === 'light' ? 'bg-gray-300' : 'bg-gray-700'} mb-1`} />
                  <div className="flex gap-0.5">
                    <div className={`flex-1 h-2 rounded ${t.id === 'light' ? 'bg-white' : 'bg-gray-800'}`} />
                    <div className={`flex-1 h-2 rounded ${t.id === 'light' ? 'bg-white' : 'bg-gray-800'}`} />
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AccentColorPicker({ settings, update, ACCENT_COLORS }) {
  const accents = [
    { id: 'green', label: 'Green', emoji: '🌿' },
    { id: 'blue', label: 'Blue', emoji: '💧' },
    { id: 'purple', label: 'Purple', emoji: '🪻' },
    { id: 'rose', label: 'Rose', emoji: '🌹' },
    { id: 'amber', label: 'Amber', emoji: '🌻' },
    { id: 'teal', label: 'Teal', emoji: '🌊' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {accents.map((a) => {
        const colors = ACCENT_COLORS[a.id];
        const active = settings.accent === a.id;
        return (
          <button
            key={a.id}
            onClick={() => update('accent', a.id)}
            className={`relative p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
              active
                ? 'border-leaf-500 ring-1 ring-leaf-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {active && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors[500] }}>
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{a.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{a.label}</span>
            </div>
            <div className="flex gap-1">
              {[300, 400, 500, 600, 700].map((shade) => (
                <div
                  key={shade}
                  className="flex-1 h-4 rounded-md first:rounded-l-lg last:rounded-r-lg"
                  style={{ backgroundColor: colors[shade] }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function FontPicker({ settings, update }) {
  const fonts = [
    { id: 'inter', label: 'Inter', preview: 'Aa Bb Cc', style: "'Inter', system-ui, sans-serif" },
    { id: 'sans', label: 'System', preview: 'Aa Bb Cc', style: "system-ui, -apple-system, sans-serif" },
    { id: 'serif', label: 'Serif', preview: 'Aa Bb Cc', style: "'Georgia', 'Times New Roman', serif" },
    { id: 'mono', label: 'Mono', preview: 'Aa Bb Cc', style: "'Courier New', monospace" },
    { id: 'rounded', label: 'Rounded', preview: 'Aa Bb Cc', style: "'Nunito', system-ui, sans-serif" },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {fonts.map((f) => {
        const active = settings.font === f.id;
        return (
          <button
            key={f.id}
            onClick={() => update('font', f.id)}
            className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
              active
                ? 'border-leaf-500 bg-leaf-50 dark:bg-leaf-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-0.5" style={{ fontFamily: f.style }}>
              {f.preview}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{f.label}</p>
          </button>
        );
      })}
    </div>
  );
}

function FontSizeControl({ settings, update, FONT_SIZES }) {
  const sizes = [
    { id: 'small', label: 'S', value: 14 },
    { id: 'default', label: 'M', value: 16 },
    { id: 'large', label: 'L', value: 18 },
    { id: 'xlarge', label: 'XL', value: 20 },
  ];

  return (
    <div>
      <div className="flex items-center gap-3">
        <Minus className="w-4 h-4 text-gray-400" />
        <div className="flex-1 flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {sizes.map((s) => {
            const active = settings.fontSize === s.id;
            return (
              <button
                key={s.id}
                onClick={() => update('fontSize', s.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-white dark:bg-gray-700 text-leaf-600 dark:text-leaf-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {s.label}
                <span className="block text-[9px] text-gray-400 dark:text-gray-500 font-normal mt-0.5">{s.value}px</span>
              </button>
            );
          })}
        </div>
        <Plus className="w-4 h-4 text-gray-400" />
      </div>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
        Preview: <span style={{ fontSize: `${FONT_SIZES[settings.fontSize]}px` }}>The quick brown fox jumps over the lazy dog</span>
      </p>
    </div>
  );
}

function BorderRadiusControl({ settings, update }) {
  const options = [
    { id: 'none', label: 'Sharp', radius: '0px' },
    { id: 'small', label: 'Subtle', radius: '6px' },
    { id: 'default', label: 'Default', radius: '12px' },
    { id: 'large', label: 'Round', radius: '16px' },
    { id: 'full', label: 'Pill', radius: '9999px' },
  ];

  return (
    <div className="flex gap-2.5">
      {options.map((opt) => {
        const active = settings.borderRadius === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => update('borderRadius', opt.id)}
            className={`flex-1 p-3 border-2 text-center transition-all cursor-pointer ${
              active
                ? 'border-leaf-500 bg-leaf-50 dark:bg-leaf-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            style={{ borderRadius: opt.radius }}
          >
            <div
              className="w-8 h-8 bg-leaf-500 mx-auto mb-1.5"
              style={{ borderRadius: opt.radius }}
            />
            <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{opt.label}</p>
          </button>
        );
      })}
    </div>
  );
}

function LivePreview({ settings, ACCENT_COLORS }) {
  const colors = ACCENT_COLORS[settings.accent];
  const isDark = settings.theme === 'dark';

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        isDark ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'
      }`}
      style={{ borderRadius: 'var(--app-radius, 12px)' }}
    >
      {/* Title bar */}
      <div className={`px-3 py-2 flex items-center gap-1.5 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className={`text-[10px] ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>LeafCare Preview</span>
      </div>

      <div className="flex h-32">
        {/* Sidebar */}
        <div className={`w-16 p-2 ${isDark ? 'bg-gray-900' : 'bg-white'} border-r ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="w-5 h-5 rounded-md mb-2 mx-auto" style={{ backgroundColor: colors[500] }} />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full mb-1.5 mx-1 ${
                i === 1
                  ? ''
                  : isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}
              style={i === 1 ? { backgroundColor: colors[100] } : {}}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`flex-1 p-3 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
          <div className={`h-2 w-20 rounded-full mb-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
          <div className="flex gap-1.5 mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-8 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                style={{ borderRadius: 'var(--app-radius, 12px)' }}
              >
                <div className="w-3/4 h-1 rounded-full mt-2 mx-auto" style={{ backgroundColor: i === 1 ? colors[500] : isDark ? '#374151' : '#e5e7eb' }} />
              </div>
            ))}
          </div>
          <div className="flex gap-1.5">
            <div
              className={`flex-1 h-12 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
              style={{ borderRadius: 'var(--app-radius, 12px)' }}
            />
            <div
              className="w-12 h-12"
              style={{ borderRadius: 'var(--app-radius, 12px)', backgroundColor: colors[500] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { settings, update, resetAll, ACCENT_COLORS, FONTS, FONT_SIZES, BORDER_RADIUS } = useTheme();

  return (
    <div className="px-8 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Customize the look and feel of your dashboard
          </p>
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </button>
      </div>

      {/* Live preview */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">LIVE PREVIEW</span>
        </div>
        <LivePreview settings={settings} ACCENT_COLORS={ACCENT_COLORS} />
      </div>

      <div className="space-y-5">
        {/* Theme */}
        <SectionCard title="Theme" description="Choose between light and dark mode" icon={Sun}>
          <ThemeSelector settings={settings} update={update} />
        </SectionCard>

        {/* Accent Color */}
        <SectionCard title="Accent Color" description="Primary color used across the interface" icon={Palette}>
          <AccentColorPicker settings={settings} update={update} ACCENT_COLORS={ACCENT_COLORS} />
        </SectionCard>

        {/* Font Family */}
        <SectionCard title="Font Family" description="Typography style for the interface" icon={Type}>
          <FontPicker settings={settings} update={update} />
        </SectionCard>

        {/* Font Size */}
        <SectionCard title="Font Size" description="Adjust the base text size" icon={Type}>
          <FontSizeControl settings={settings} update={update} FONT_SIZES={FONT_SIZES} />
        </SectionCard>

        {/* Border Radius */}
        <SectionCard title="Border Radius" description="Control the roundness of elements" icon={RectangleHorizontal}>
          <BorderRadiusControl settings={settings} update={update} />
        </SectionCard>
      </div>
    </div>
  );
}
