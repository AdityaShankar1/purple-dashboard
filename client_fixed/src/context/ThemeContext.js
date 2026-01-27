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



import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    background: {
      gradient:
        "linear-gradient(90deg, rgba(69, 113, 209, 1) 0%, rgba(250, 250, 250, 1) 100%)",
    },
    colors: {
      primary: "#4571D1",
      secondary: "#6D8FDA",
      accent: "#4F46E5",
      text: "#1E1E1E",
      textSecondary: "#6B7280", // gray-500
      success: "#22C55E",       // green-500
      info: "#3B82F6",          // blue-500
      warning: "#FACC15",       // yellow-500
      danger: "#EF4444",        // red-500
      mutedBg: "#E5E7EB",       // gray-200
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
