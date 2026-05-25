import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function NotesSection({ day }) {
  const { authFetch } = useAuth();
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Load note text when day changes
  useEffect(() => {
    if (!day && day !== 0) return;
    setLoading(true);
    setStatus('Loading notes...');
    authFetch(`/api/notes?day=${day}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => {
        setNote(data.note || '');
        setStatus('');
      })
      .catch(() => {
        setStatus('Failed to load notes.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [day]);

  // Handle note save action
  const handleSave = () => {
    setStatus('Saving...');
    authFetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day: parseInt(day), content: note }) // Backend schemas.NoteCreate expects 'content', not 'note'!
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to save');
        return res.json();
      })
      .then(() => {
        setStatus('✅ Notes saved successfully!');
        setTimeout(() => setStatus(''), 3000);
      })
      .catch(() => {
        setStatus('❌ Failed to save notes.');
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField
        multiline
        minRows={4}
        placeholder="✍️ Type your revision notes, pseudocode, formulas, or logs here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={loading}
        variant="outlined"
        fullWidth
        InputProps={{
          sx: {
            fontFamily: 'inherit',
            fontSize: '0.85rem',
            backgroundColor: 'rgba(15, 23, 42, 0.02)',
            borderRadius: 3,
            color: 'text.primary',
            '& fieldset': {
              borderColor: 'rgba(15, 23, 42, 0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(15, 23, 42, 0.16) !important',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main !important',
              boxShadow: '0 0 10px rgba(15, 23, 42, 0.05)',
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {status}
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
          onClick={handleSave}
          disabled={loading}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: 2,
            px: 2,
            backgroundColor: 'primary.main',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: 'none',
            },
          }}
        >
          Save Notes
        </Button>
      </Box>
    </Box>
  );
}
