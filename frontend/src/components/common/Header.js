import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useTheme, alpha } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../contexts/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { themeMode, toggleTheme } = useThemeMode();
  const isDarkMode = themeMode === 'dark';

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: '64px', px: 2 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: '1.25rem'
          }}
        >
          NutrIA
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            sx={{ 
              ml: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
