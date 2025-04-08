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
  Tab,
  Tabs,
  Badge
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import RepeatIcon from '@mui/icons-material/Repeat';
import exerciseService from '../../services/exerciseService';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const theme = useTheme();

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const type = filter === 'all' ? null : filter;
      const data = await exerciseService.getAllExercises(type);
      setExercises(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError('Impossible de récupérer les exercices. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [filter]);

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const formatExerciseValue = (exercise) => {
    if (exercise.type === 'duration') {
      if (exercise.unit === 'sec') {
        return `${exercise.value} secondes`;
      } else if (exercise.unit === 'min') {
        return `${exercise.value} minutes`;
      }
    } else if (exercise.type === 'reps') {
      return `${exercise.value} répétitions`;
    }
    return `${exercise.value} ${exercise.unit}`;
  };

  const getExerciseIcon = (type) => {
    return type === 'duration' ? <TimerIcon /> : <RepeatIcon />;
  };

  const getExerciseColor = (type) => {
    return type === 'duration' ? theme.palette.info.main : theme.palette.success.main;
  };

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
          <Button variant="outlined" onClick={fetchExercises}>Réessayer</Button>
        </Box>
      </Box>
    );
  }

  const durationExercises = exercises.filter(ex => ex.type === 'duration');
  const repsExercises = exercises.filter(ex => ex.type === 'reps');

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
          Mes exercices ({exercises.length})
        </Typography>
        <Tooltip title="Rafraîchir">
          <IconButton 
            onClick={fetchExercises} 
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

      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={filter} 
          onChange={handleFilterChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              transition: 'all 0.2s ease-in-out',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3
            }
          }}
        >
          <Tab 
            value="all" 
            label="Tous" 
            icon={
              <Badge badgeContent={exercises.length} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}>
                <FitnessCenterIcon />
              </Badge>
            } 
            iconPosition="start" 
          />
          <Tab 
            value="duration" 
            label="Durée" 
            icon={
              <Badge badgeContent={durationExercises.length} color="info" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}>
                <TimerIcon />
              </Badge>
            } 
            iconPosition="start" 
          />
          <Tab 
            value="reps" 
            label="Répétitions" 
            icon={
              <Badge badgeContent={repsExercises.length} color="success" sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}>
                <RepeatIcon />
              </Badge>
            } 
            iconPosition="start" 
          />
        </Tabs>
      </Box>
      
      {exercises.length === 0 ? (
        <Box sx={{ 
          my: 8, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FitnessCenterIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Aucun exercice trouvé
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Utilisez l'assistant pour ajouter des exercices !
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {exercises.map((exercise) => (
            <Grid item xs={12} sm={6} md={4} key={exercise._id}>
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
                  border: `1px solid ${alpha(getExerciseColor(exercise.type), 0.2)}`
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {exercise.name}
                    </Typography>
                    <Chip 
                      icon={getExerciseIcon(exercise.type)} 
                      label={exercise.type === 'duration' ? 'Durée' : 'Répétitions'} 
                      size="small" 
                      color={exercise.type === 'duration' ? 'info' : 'success'}
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    py: 2,
                    backgroundColor: alpha(getExerciseColor(exercise.type), 0.1),
                    borderRadius: 2,
                    mb: 2
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: getExerciseColor(exercise.type) }}>
                      {formatExerciseValue(exercise)}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                    Ajouté le {new Date(exercise.createdAt).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExerciseList;
