// import { createContext, useContext } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const theme = {
//     background: {
//       gradient:
//         "linear-gradient(90deg, rgba(69, 113, 209, 1) 0%, rgba(250, 250, 250, 1) 100%)",
//     },
//     colors: {
//       primary: "#4571D1",
//       secondary: "#6D8FDA",
//       text: "#1E1E1E",
//       accent: "#4F46E5",
//     },
//   };

//   return (
//     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);



import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = {
    darkMode,
    toggleDarkMode,
    colors: {
      primary: "#4571D1",
      secondary: "#6D8FDA",
      accent: "#4F46E5",
      text: darkMode ? "#F9FAFB" : "#1E1E1E",
      textSecondary: darkMode ? "#D1D5DB" : "#6B7280",
      success: "#22C55E",
      info: "#3B82F6",
      warning: "#FACC15",
      danger: "#EF4444",
      mutedBg: darkMode ? "#312E3F" : "#E5E7EB",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

