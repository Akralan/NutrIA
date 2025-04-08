import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Typography, 
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ChatInterface from '../assistant/ChatInterface';
import MealList from '../meals/MealList';
import ExerciseList from '../exercises/ExerciseList';
import assistantService from '../../services/assistantService';

// Composants temporaires pour les onglets non encore implémentés
const SleepPanel = () => (
  <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <BedtimeIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Suivi du sommeil</Typography>
    <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 400 }}>
      Cette fonctionnalité sera bientôt disponible pour vous aider à suivre et améliorer votre sommeil.
    </Typography>
  </Box>
);

const GoalsPanel = () => (
  <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <TrackChangesIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Objectifs nutritionnels</Typography>
    <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 400 }}>
      Cette fonctionnalité sera bientôt disponible pour vous aider à définir et suivre vos objectifs.
    </Typography>
  </Box>
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box sx={{ height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MainLayout = () => {
  const [tabValue, setTabValue] = useState(0);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const initializeThread = async () => {
      try {
        setLoading(true);
        const { threadId } = await assistantService.createThread();
        setThreadId(threadId);
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize thread:', error);
        setLoading(false);
      }
    };

    initializeThread();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      height: 'calc(100vh - 100px)', 
      px: { xs: 1, sm: 2, md: 3 },
      pt: 2
    }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Panneau de conversation à gauche */}
        <Grid item xs={12} md={6} lg={5} sx={{ height: '100%' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 3,
              boxShadow: theme.shadows[2],
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 600, 
              color: theme.palette.primary.main,
              pb: 1,
              borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              Assistant NutrIA
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <ChatInterface threadId={threadId} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Panneau de contenu à droite */}
        <Grid item xs={12} md={6} lg={7} sx={{ height: '100%' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 3,
              boxShadow: theme.shadows[2],
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <Box sx={{ borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="fullWidth"
                aria-label="nutrition tabs"
                sx={{
                  '& .MuiTab-root': {
                    py: 1.5,
                    fontWeight: 600,
                    transition: 'all 0.2s ease-in-out',
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    height: 3
                  }
                }}
              >
                <Tab icon={<RestaurantIcon />} label="Repas" iconPosition="start" />
                <Tab icon={<BedtimeIcon />} label="Sommeil" iconPosition="start" />
                <Tab icon={<FitnessCenterIcon />} label="Exercices" iconPosition="start" />
                <Tab icon={<TrackChangesIcon />} label="Objectifs" iconPosition="start" />
              </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <TabPanel value={tabValue} index={0}>
                <MealList />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <SleepPanel />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <ExerciseList />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <GoalsPanel />
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
