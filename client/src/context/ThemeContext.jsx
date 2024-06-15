import React, { createContext, useState, useContext, useEffect } from "react";
import { DARK_THEME, LIGHT_THEME } from "../utils/themeConstants";

const ThemeContext = createContext();

export const useDashboardTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("themeMode"));
  window.localStorage.setItem("themeMode", theme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
    window.localStorage.setItem("themeMode", theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, setTheme, toggleTheme]);
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};