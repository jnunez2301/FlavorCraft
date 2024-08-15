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
  const [theme, setTheme] = React.useState<ThemeType>(ThemeType.Light);

  // Function to handle the theme change based on system preferences
  const handleThemeChange = (e: MediaQueryListEvent) => {
    setTheme(e.matches ? ThemeType.Dark : ThemeType.Light);
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    // Set the initial theme based on user preference
    setTheme(prefersDarkMode.matches ? ThemeType.Dark : ThemeType.Light);

    // Listen for changes in the user's color scheme preference
    prefersDarkMode.addEventListener("change", handleThemeChange);

    // Clean up the event listener on component unmount
    return () => {
      prefersDarkMode.removeEventListener("change", handleThemeChange);
    };
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
