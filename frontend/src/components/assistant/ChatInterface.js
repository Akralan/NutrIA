import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress,
  List,
  ListItem,
  Divider,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import assistantService from '../../services/assistantService';

const ChatInterface = ({ threadId: externalThreadId }) => {
  const [threadId, setThreadId] = useState(externalThreadId || null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  // Créer un thread au chargement du composant si aucun n'est fourni
  useEffect(() => {
    const initializeThread = async () => {
      if (externalThreadId) {
        setThreadId(externalThreadId);
        return;
      }
      
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
  }, [externalThreadId]);

  // Mettre à jour le threadId si la prop change
  useEffect(() => {
    if (externalThreadId && externalThreadId !== threadId) {
      setThreadId(externalThreadId);
    }
  }, [externalThreadId, threadId]);

  // Charger les messages existants quand le threadId est disponible
  useEffect(() => {
    const fetchMessages = async () => {
      if (!threadId) return;
      
      try {
        setLoading(true);
        const response = await assistantService.getMessages(threadId);
        if (Array.isArray(response) && response.length > 0) {
          // Inverser l'ordre pour avoir les plus anciens en haut
          setMessages(response.slice().reverse());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [threadId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Envoyer un message à l'assistant
  const handleSendMessage = async () => {
    if (!input.trim() || !threadId) return;

    try {
      setLoading(true);
      
      // Ajouter le message de l'utilisateur à l'interface
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: [{ type: 'text', text: { value: input } }] 
      }]);
      setInput('');

      // Envoyer le message à l'API
      await assistantService.sendMessage(threadId, input);
      
      // Récupérer tous les messages mis à jour
      const response = await assistantService.getMessages(threadId);
      if (Array.isArray(response) && response.length > 0) {
        // Inverser l'ordre pour avoir les plus anciens en haut
        setMessages(response.slice().reverse());
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box 
        sx={{ 
          flex: 1, 
          mb: 2, 
          overflow: 'auto',
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ 
            flex: 1,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <SmartToyIcon sx={{ fontSize: 60, color: theme.palette.primary.main, opacity: 0.3, mb: 2 }} />
            <Typography align="center" color="text.secondary" variant="h6" sx={{ mb: 1 }}>
              Bienvenue sur NutrIA
            </Typography>
            <Typography align="center" color="text.secondary" variant="body1" sx={{ maxWidth: 400 }}>
              Commencez à discuter avec l'assistant pour suivre vos repas et obtenir des conseils nutritionnels personnalisés.
            </Typography>
          </Box>
        ) : (
          <List sx={{ px: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ 
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                    gap: 1.5
                  }}
                >
                  {msg.role !== 'user' && (
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 38,
                        height: 38
                      }}
                    >
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                  )}
                  
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      maxWidth: '75%',
                      backgroundColor: msg.role === 'user' 
                        ? alpha(theme.palette.primary.main, 0.1)
                        : theme.palette.background.paper,
                      borderRadius: 2.5,
                      border: `1px solid ${alpha(
                        msg.role === 'user' ? theme.palette.primary.main : theme.palette.divider,
                        msg.role === 'user' ? 0.2 : 1
                      )}`,
                      boxShadow: theme.shadows[1]
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        '& a': {
                          color: theme.palette.primary.main,
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }
                      }}
                    >
                      {msg.content && Array.isArray(msg.content) && msg.content[0] && msg.content[0].type === 'text' 
                        ? msg.content[0].text.value 
                        : (typeof msg.content === 'string' ? msg.content : 'Message non disponible')}
                    </Typography>
                  </Paper>
                  
                  {msg.role === 'user' && (
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        width: 38,
                        height: 38
                      }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )}
                </ListItem>
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Posez une question à l'assistant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading || !threadId}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[1],
              '&.Mui-focused': {
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`
              }
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          onClick={handleSendMessage}
          disabled={loading || !input.trim() || !threadId}
          sx={{
            borderRadius: 3,
            px: 3,
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4]
            }
          }}
        >
          Envoyer
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInterface;
