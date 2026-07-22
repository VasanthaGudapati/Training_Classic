import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function ProgressRing({ percent, size = 130 }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* SVG definitions for gradient fill */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Background faint progress circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={6}
        sx={{ 
          color: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.06)' 
        }}
      />
      {/* Dynamic foreground progress circle */}
      <CircularProgress
        variant="determinate"
        value={percent}
        size={size}
        thickness={6}
        sx={{
          position: 'absolute',
          left: 0,
          strokeLinecap: 'round',
          '& .MuiCircularProgress-circle': {
            stroke: 'url(#progressGradient)',
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" component="div" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1, letterSpacing: '-0.02em' }}>
          {percent}%
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', textTransform: 'uppercase', fontSize: 8, fontWeight: 700, letterSpacing: 1, mt: 0.5 }}>
          Completed
        </Typography>
      </Box>
    </Box>
  );
}
