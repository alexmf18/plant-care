import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ACCENT_COLORS = {
  green: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
    400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
    800: '#166534', 900: '#14532d',
  },
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
    800: '#1e40af', 900: '#1e3a8a',
  },
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
    400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
    800: '#6b21a8', 900: '#581c87',
  },
  rose: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
    400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
    800: '#9f1239', 900: '#881337',
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f',
  },
  teal: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
    400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
    800: '#115e59', 900: '#134e4a',
  },
};

const FONTS = {
  inter: "'Inter', system-ui, -apple-system, sans-serif",
  sans: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  serif: "'Georgia', 'Times New Roman', serif",
  rounded: "'Nunito', 'Varela Round', system-ui, sans-serif",
};

const FONT_SIZES = {
  small: 14,
  default: 16,
  large: 18,
  xlarge: 20,
};

const BORDER_RADIUS = {
  none: '0px',
  small: '6px',
  default: '12px',
  large: '16px',
  full: '9999px',
};

const defaults = {
  theme: 'light',
  accent: 'green',
  font: 'inter',
  fontSize: 'default',
  borderRadius: 'default',
  sidebarCompact: false,
};

function loadSettings() {
  try {
    const stored = localStorage.getItem('leafcare-settings');
    if (stored) return { ...defaults, ...JSON.parse(stored) };
  } catch {}
  return defaults;
}

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('leafcare-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply CSS variables to <html>
  useEffect(() => {
    const root = document.documentElement;
    const accent = ACCENT_COLORS[settings.accent] || ACCENT_COLORS.green;

    // Theme class
    root.classList.toggle('dark', settings.theme === 'dark');

    // Accent colors
    Object.entries(accent).forEach(([shade, value]) => {
      root.style.setProperty(`--color-leaf-${shade}`, value);
    });

    // Font
    const fontValue = FONTS[settings.font] || FONTS.inter;
    root.style.setProperty('--app-font', fontValue);
    document.body.style.fontFamily = fontValue;

    // Font size
    const size = FONT_SIZES[settings.fontSize] || 16;
    root.style.setProperty('--app-font-size', `${size}px`);
    root.style.fontSize = `${size}px`;

    // Border radius
    const radius = BORDER_RADIUS[settings.borderRadius] || '12px';
    root.style.setProperty('--app-radius', radius);

    // Body background
    document.body.style.backgroundColor =
      settings.theme === 'dark' ? '#0f1210' : '#f8faf8';

  }, [settings]);

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const resetAll = () => setSettings(defaults);

  return (
    <ThemeContext.Provider value={{ settings, update, resetAll, ACCENT_COLORS, FONTS, FONT_SIZES, BORDER_RADIUS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
