/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { PropsWithChildren, useEffect } from "react";
import Theme from "../theme/Theme";

export enum ThemeType {
  Light = "light",
  Dark = "dark",
}

type ThemeContextState = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = React.createContext<ThemeContextState | undefined>(
  undefined
);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setThemeState] = React.useState<ThemeType>(ThemeType.Light);

  // Update theme both in state and local storage
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("preferred-theme", newTheme);
  };

  // Function to handle the theme change based on system preferences
  const handleThemeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? ThemeType.Dark : ThemeType.Light;
    setTheme(newTheme);
  };

  useEffect(() => {
    // Retrieve the theme from local storage, if available
    const storedTheme = localStorage.getItem("preferred-theme") as ThemeType | null;

    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set the initial theme based on user preference
      setThemeState(prefersDarkMode.matches ? ThemeType.Dark : ThemeType.Light);

      // Listen for changes in the user's color scheme preference
      prefersDarkMode.addEventListener("change", handleThemeChange);

      // Clean up the event listener on component unmount
      return () => {
        prefersDarkMode.removeEventListener("change", handleThemeChange);
      };
    }
  }, []);

  const values = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={values}>
      <Theme $themeMode={theme}>{children}</Theme>
    </ThemeContext.Provider>
  );
};
