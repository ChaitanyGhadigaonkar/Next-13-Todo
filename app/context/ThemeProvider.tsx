"use client";

import { createContext, useEffect, useState } from "react";

type themeContextType = {
  theme: string;
  setTheme: (state: string) => void;
};

export const ThemeContext = createContext<themeContextType>({
  theme: "dark",
  setTheme: () => {},
});

const DarkContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    if (theme === "dark") {
      root.setAttribute("class", "dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  // icons SunMoon  MoonStar

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default DarkContextProvider;
