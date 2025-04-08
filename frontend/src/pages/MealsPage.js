import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MealList from '../components/meals/MealList';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const MealsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Mes Repas
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/assistant"
            startIcon={<SmartToyIcon />}
          >
            Ajouter avec l'assistant
          </Button>
        </Box>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Historique de vos repas et leurs valeurs nutritionnelles
        </Typography>
        
        <MealList />
      </Box>
    </Container>
  );
};

export default MealsPage;
