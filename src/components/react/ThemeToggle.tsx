import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

declare global {
  interface Window {
    __portfolioTheme?: {
      getTheme: () => Theme;
      setTheme: (theme: Theme) => void;
    };
  }
}

function getDocumentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("theme-dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const syncTheme = () => {
      const nextTheme = window.__portfolioTheme?.getTheme() ?? getDocumentTheme();
      setTheme(nextTheme);
    };

    syncTheme();

    const handleThemeChange = () => syncTheme();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "portfolio-theme") syncTheme();
    };

    window.addEventListener("portfolio-themechange", handleThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("portfolio-themechange", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      type="button"
      className="theme-toggle-button"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => {
        window.__portfolioTheme?.setTheme(nextTheme);
      }}
    >
      <Icon className="theme-toggle-button__icon" strokeWidth={1.8} />
      <span className="theme-toggle-button__label">{nextTheme}</span>
    </button>
  );
}
