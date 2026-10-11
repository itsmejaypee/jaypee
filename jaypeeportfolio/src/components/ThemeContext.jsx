import React, { createContext, useContext, useState, useEffect } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);

export function isDarkTheme(theme) {
  return (
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  const applyTheme = (t) => {
    document.documentElement.classList.toggle("dark", isDarkTheme(t));
  };

  const setTheme = (newTheme, event) => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If view transition is not supported or motion is reduced or theme appearance doesn't toggle
    if (
      isDarkTheme(newTheme) === isDarkTheme(theme) ||
      !document.startViewTransition ||
      isReducedMotion ||
      !event
    ) {
      setThemeState(newTheme);
      return;
    }

    const { clientX, clientY } = event;
    const radius = Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    );

    document.documentElement.style.setProperty("--reveal-x", `${clientX}px`);
    document.documentElement.style.setProperty("--reveal-y", `${clientY}px`);
    document.documentElement.style.setProperty("--reveal-radius", `${radius}px`);

    document.startViewTransition(() => {
      flushSync(() => {
        setThemeState(newTheme);
      });
    });
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme("system");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
