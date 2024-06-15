import React, { createContext, useState, useContext, useEffect } from "react";
import { DARK_THEME, LIGHT_THEME } from "../utils/themeConstants";

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    // const [isDarkMode, setIsDarkMode] = useState(true);

    // const themev = isDarkMode ? "dark" : "light";

    const [theme, setTheme] = useState(window.localStorage.getItem("themeMode"));
    window.localStorage.setItem("themeMode", "light");

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
        );
        window.localStorage.setItem("themeMode", theme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};