import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ChatInterface from '../components/assistant/ChatInterface';

const AssistantPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Assistant NutrIA
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          Discutez avec votre assistant nutritionnel intelligent
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <ChatInterface />
        </Paper>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Conseils d'utilisation :</strong>
          </Typography>
          <ul>
            <Typography variant="body2" component="li" color="text.secondary">
              Décrivez vos repas en détail pour obtenir des analyses nutritionnelles précises
            </Typography>
            <Typography variant="body2" component="li" color="text.secondary">
              Posez des questions sur la nutrition, les aliments ou vos objectifs de santé
            </Typography>
            <Typography variant="body2" component="li" color="text.secondary">
              Demandez des recommandations pour améliorer votre alimentation
            </Typography>
          </ul>
        </Box>
      </Box>
    </Container>
  );
};

export default AssistantPage;
