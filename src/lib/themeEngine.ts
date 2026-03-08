export interface ThemeConfig {
  id: string;
  label: string;
  emoji: string;
  preview: string; // gradient for preview swatch
  vars: Record<string, string>;
}

export const themes: ThemeConfig[] = [
  {
    id: "night-blue",
    label: "Night Blue",
    emoji: "🌙",
    preview: "from-[hsl(240,35%,15%)] to-[hsl(220,55%,25%)]",
    vars: {
      "--background": "240 30% 8%",
      "--foreground": "240 20% 95%",
      "--card": "240 25% 12%",
      "--primary": "260 60% 65%",
      "--secondary": "220 50% 55%",
      "--muted": "240 20% 18%",
      "--accent": "280 45% 55%",
      "--border": "240 20% 20%",
    },
  },
  {
    id: "lavender-calm",
    label: "Lavender Calm",
    emoji: "💜",
    preview: "from-[hsl(260,40%,18%)] to-[hsl(280,45%,28%)]",
    vars: {
      "--background": "270 30% 8%",
      "--foreground": "270 20% 95%",
      "--card": "270 25% 12%",
      "--primary": "280 55% 65%",
      "--secondary": "260 50% 58%",
      "--muted": "270 20% 18%",
      "--accent": "300 45% 55%",
      "--border": "270 20% 20%",
    },
  },
  {
    id: "ocean-deep",
    label: "Ocean Deep",
    emoji: "🌊",
    preview: "from-[hsl(200,50%,12%)] to-[hsl(190,60%,22%)]",
    vars: {
      "--background": "200 40% 7%",
      "--foreground": "200 20% 95%",
      "--card": "200 30% 11%",
      "--primary": "190 70% 50%",
      "--secondary": "210 55% 55%",
      "--muted": "200 25% 16%",
      "--accent": "170 50% 45%",
      "--border": "200 25% 18%",
    },
  },
  {
    id: "forest-night",
    label: "Forest Night",
    emoji: "🌲",
    preview: "from-[hsl(150,30%,10%)] to-[hsl(140,40%,18%)]",
    vars: {
      "--background": "150 25% 7%",
      "--foreground": "150 15% 93%",
      "--card": "150 20% 11%",
      "--primary": "140 50% 50%",
      "--secondary": "160 45% 45%",
      "--muted": "150 20% 16%",
      "--accent": "120 40% 45%",
      "--border": "150 20% 18%",
    },
  },
  {
    id: "sunset-warm",
    label: "Sunset Warm",
    emoji: "🌅",
    preview: "from-[hsl(15,35%,12%)] to-[hsl(30,50%,20%)]",
    vars: {
      "--background": "20 30% 7%",
      "--foreground": "30 20% 95%",
      "--card": "20 25% 11%",
      "--primary": "25 80% 55%",
      "--secondary": "40 60% 50%",
      "--muted": "20 20% 16%",
      "--accent": "10 65% 55%",
      "--border": "20 20% 18%",
    },
  },
  {
    id: "rose-dream",
    label: "Rose Dream",
    emoji: "🌸",
    preview: "from-[hsl(340,30%,12%)] to-[hsl(350,40%,22%)]",
    vars: {
      "--background": "340 25% 7%",
      "--foreground": "340 15% 95%",
      "--card": "340 20% 11%",
      "--primary": "350 60% 60%",
      "--secondary": "330 50% 55%",
      "--muted": "340 20% 16%",
      "--accent": "320 45% 55%",
      "--border": "340 20% 18%",
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    emoji: "🌌",
    preview: "from-[hsl(180,30%,10%)] to-[hsl(280,40%,20%)]",
    vars: {
      "--background": "230 30% 6%",
      "--foreground": "200 20% 95%",
      "--card": "230 25% 10%",
      "--primary": "160 70% 50%",
      "--secondary": "280 50% 60%",
      "--muted": "230 20% 15%",
      "--accent": "200 60% 55%",
      "--border": "230 20% 18%",
    },
  },
  {
    id: "midnight-gold",
    label: "Midnight Gold",
    emoji: "✨",
    preview: "from-[hsl(240,30%,8%)] to-[hsl(45,50%,20%)]",
    vars: {
      "--background": "240 25% 6%",
      "--foreground": "45 30% 95%",
      "--card": "240 20% 10%",
      "--primary": "45 80% 55%",
      "--secondary": "35 60% 50%",
      "--muted": "240 15% 15%",
      "--accent": "30 70% 50%",
      "--border": "240 15% 18%",
    },
  },
];

export function applyTheme(themeId: string) {
  const theme = themes.find((t) => t.id === themeId);
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  localStorage.setItem("thookam-theme", themeId);
}

export function loadSavedTheme(): string {
  return localStorage.getItem("thookam-theme") || "night-blue";
}
