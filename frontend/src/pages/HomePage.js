import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Bienvenue sur NutrIA
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Votre assistant nutritionnel intelligent pour une vie plus saine
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 6 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/assistant"
            startIcon={<SmartToyIcon />}
            sx={{ mr: 2 }}
          >
            Parler à l'assistant
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={RouterLink} 
            to="/meals"
            startIcon={<RestaurantIcon />}
          >
            Voir mes repas
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Assistant IA
              </Typography>
              <Typography paragraph>
                Utilisez notre assistant IA pour enregistrer vos repas simplement en les décrivant.
                L'assistant analysera automatiquement les ingrédients et calculera les valeurs nutritionnelles.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Exemple: "J'ai mangé une salade composée de laitue, tomates, concombre, poulet grillé et vinaigrette balsamique"
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Suivi nutritionnel
              </Typography>
              <Typography paragraph>
                Suivez vos apports nutritionnels quotidiens et recevez des recommandations personnalisées
                pour améliorer votre alimentation et atteindre vos objectifs de santé.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consultez vos repas enregistrés et leurs valeurs nutritionnelles pour mieux comprendre vos habitudes alimentaires.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
