import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte
export const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte de thème
export const useThemeMode = () => useContext(ThemeContext);

// Fournisseur du contexte de thème
export const ThemeProvider = ({ children }) => {
  // Récupération du thème depuis le localStorage ou utilisation du thème clair par défaut
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme || 'light';
  });

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Mise à jour du localStorage lorsque le thème change
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Valeurs exposées par le contexte
  const value = {
    themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
