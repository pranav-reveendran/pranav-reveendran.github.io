
import { Moon, Sun, Laptop, Contrast, Palette } from 'lucide-react';
import { useTheme, Theme } from '../context/ThemeContext';
import { cn } from '@/lib/utils';

const icons: Record<Theme, React.ElementType> = { 
  light: Sun, 
  system: Laptop, 
  dark: Moon,
  'high-contrast': Contrast,
  colorblind: Palette
};

const next: Record<Theme, Theme> = { 
  light: 'dark',
  dark: 'system', 
  system: 'high-contrast',
  'high-contrast': 'colorblind',
  colorblind: 'light'
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      onClick={() => setTheme(next[theme])}
      className="relative inline-flex h-9 w-16 items-center justify-center rounded-full bg-surface ring-1 ring-border transition-colors duration-200"
      aria-label={`Switch to ${next[theme]} theme (currently ${theme})`}
    >
      <span
        className={cn(
          "absolute h-7 w-7 rounded-full bg-accent transition-all duration-200",
          theme === 'light' ? "left-1" : 
          theme === 'dark' ? "left-[calc(25%-14px)]" :
          theme === 'system' ? "left-[calc(50%-14px)]" : 
          theme === 'high-contrast' ? "left-[calc(75%-14px)]" :
          "left-[calc(100%-28px)]"
        )}
      />
      <div className="flex w-full justify-between px-1.5">
        <Sun className={cn("h-4 w-4", theme === 'light' ? "text-surface" : "text-accent/30")} />
        <Moon className={cn("h-4 w-4", theme === 'dark' ? "text-surface" : "text-accent/30")} />
        <Laptop className={cn("h-4 w-4", theme === 'system' ? "text-surface" : "text-accent/30")} />
        <Contrast className={cn("h-4 w-4", theme === 'high-contrast' ? "text-surface" : "text-accent/30")} />
        <Palette className={cn("h-4 w-4", theme === 'colorblind' ? "text-surface" : "text-accent/30")} />
      </div>
    </button>
  );
}
