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
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  useEffect(() => {
    if(prefersDarkMode){
      setTheme(ThemeType.Dark)
    }else {
      setTheme(ThemeType.Light)
    }
  }, [prefersDarkMode]);
  const values = {
    theme,
    setTheme,
  };
  console.log(theme)
  return (
    <ThemeContext.Provider value={values}>
      <Theme $themeMode={theme}>{children}</Theme>
    </ThemeContext.Provider>
  );
};
