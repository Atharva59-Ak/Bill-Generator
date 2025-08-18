import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Apply theme class to document for global styling
  useEffect(() => {
    if (resolvedTheme) {
      // Remove all theme classes first
      document.documentElement.classList.remove('light', 'dark');
      // Add the resolved theme class
      document.documentElement.classList.add(resolvedTheme);
      // Also add to body for better compatibility
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Immediately apply the class for instant feedback
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeToggle}
      className="rounded-full hover:bg-opacity-80 transition-all duration-300 shadow-lg bg-background border-border text-foreground"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
    </Button>
  );
};

export { ThemeToggle };