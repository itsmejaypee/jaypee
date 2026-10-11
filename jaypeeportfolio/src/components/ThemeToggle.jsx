import React from "react";
import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

const themeOptions = [
  { value: "system", icon: Monitor, label: "System theme" },
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-border p-0.5">
      {themeOptions.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            onClick={(e) => setTheme(value, e)}
            className={`inline-flex items-center justify-center size-5 rounded-full transition-colors duration-base ease-out ${
              isActive
                ? "bg-border/70 text-text"
                : "text-text-faint hover:text-text"
            }`}
          >
            <Icon size={12} />
          </button>
        );
      })}
    </div>
  );
}
