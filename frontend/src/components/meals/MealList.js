import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress,
  Chip,
  Divider,
  Button,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
  LinearProgress
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import mealService from '../../services/mealService';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const data = await mealService.getAllMeals();
      setMeals(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setError('Impossible de récupérer les repas. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="outlined" onClick={fetchMeals}>Réessayer</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        pb: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Mes repas ({meals.length})
        </Typography>
        <Tooltip title="Rafraîchir">
          <IconButton 
            onClick={fetchMeals} 
            size="small"
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.2),
              }
            }}
          >
            <RefreshIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {meals.length === 0 ? (
        <Box sx={{ 
          my: 8, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Aucun repas trouvé
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Utilisez l'assistant pour ajouter des repas !
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} key={meal._id}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: theme.shadows[1],
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                    transform: 'translateY(-4px)'
                  },
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {meal.nom}
                  </Typography>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  {meal.ingredients && meal.ingredients.length > 0 && (
                    <Box sx={{ mb: 2.5 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                        Ingrédients:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {meal.ingredients.map((ingredient, index) => (
                          <Chip 
                            key={index} 
                            label={ingredient} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              borderRadius: '16px',
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              borderColor: alpha(theme.palette.primary.main, 0.2),
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {meal.macronutriments && (
                    <Box sx={{ mb: 2.5 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                        Macronutriments:
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            Protéines: {meal.macronutriments.proteines || 0}g
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((meal.macronutriments.proteines || 0) * 2, 100)} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.info.main, 0.15),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.info.main
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            Glucides: {meal.macronutriments.glucides || 0}g
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((meal.macronutriments.glucides || 0) / 2, 100)} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.warning.main, 0.15),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.warning.main
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            Lipides: {meal.macronutriments.lipides || 0}g
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((meal.macronutriments.lipides || 0) * 3, 100)} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.error.main, 0.15),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.error.main
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                            Calories: {meal.macronutriments.calories || 0}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((meal.macronutriments.calories || 0) / 20, 100)} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.secondary.main, 0.15),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.secondary.main
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {meal.score_nutritionnel !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                      <Chip 
                        label={`Score nutritionnel: ${meal.score_nutritionnel}/5`}
                        color={meal.score_nutritionnel >= 4 ? 'success' : meal.score_nutritionnel >= 2 ? 'warning' : 'error'}
                        sx={{ 
                          fontWeight: 600, 
                          px: 1.5,
                          borderRadius: '16px',
                          boxShadow: theme.shadows[1]
                        }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MealList;
