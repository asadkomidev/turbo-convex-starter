"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, FC } from "react";

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="bg-transparent border-none flex items-center gap-2 hover:bg-accent p-2 rounded-md transition-colors cursor-pointer"
        aria-label="Toggle theme"
      >
        <span className="flex items-center gap-2">
          <Sun className="size-4 " />
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-transparent border-none flex items-center gap-2 hover:bg-accent p-2 rounded-md transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <span className="flex items-center gap-2">
          <Sun className="size-4 " />
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Moon className="size-4 " />
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
