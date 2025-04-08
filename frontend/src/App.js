import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Header from './components/common/Header';
import MainLayout from './components/common/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import themes from './theme';
import { ThemeProvider, useThemeMode } from './contexts/ThemeContext';
import './App.css';

// Composant qui utilise le contexte de thème
const ThemedApp = () => {
  const { themeMode } = useThemeMode();
  
  return (
    <MuiThemeProvider theme={themes[themeMode]}>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 64px - 36px)', 
              overflow: 'hidden'
            }}
          >
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
          <Box 
            component="footer" 
            sx={{ 
              py: 1, 
              bgcolor: 'background.paper', 
              textAlign: 'center',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              color: 'text.secondary',
              fontSize: '0.75rem',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            NutrIA {new Date().getFullYear()} - Votre assistant nutritionnel intelligent
          </Box>
        </Box>
      </Router>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
