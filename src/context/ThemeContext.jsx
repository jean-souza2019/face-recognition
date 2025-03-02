import React, { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [mode, setMode] = useState(savedTheme);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: mode,
      },
    }),
    [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
