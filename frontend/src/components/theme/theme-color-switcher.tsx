"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { THEMES, type ThemeName, DEFAULT_THEME } from "@/lib/themes";
import { Check, Paintbrush } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ThemeColorSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("color-theme") as ThemeName | null;
    if (stored) {
      setActiveTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    }
  }, []);

  function selectTheme(theme: ThemeName) {
    setActiveTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("color-theme", theme);
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Paintbrush className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Paintbrush className="h-4 w-4" />
          <span
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background"
            style={{ backgroundColor: THEMES.find((t) => t.name === activeTheme)?.color }}
          />
          <span className="sr-only">Switch color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-1 gap-0.5 p-1">
          {THEMES.map((theme) => (
            <button
              key={theme.name}
              onClick={() => selectTheme(theme.name)}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent",
                activeTheme === theme.name && "bg-accent"
              )}
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-border/50"
                style={{ backgroundColor: theme.color }}
              />
              <span className="flex-1 text-left">{theme.label}</span>
              {activeTheme === theme.name && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
