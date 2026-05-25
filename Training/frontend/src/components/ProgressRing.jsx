import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function ProgressRing({ percent }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background faint progress circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={110}
        thickness={5}
        sx={{ color: 'rgba(15, 23, 42, 0.06)' }}
      />
      {/* Dynamic foreground progress circle */}
      <CircularProgress
        variant="determinate"
        value={percent}
        size={110}
        thickness={5}
        sx={{
          position: 'absolute',
          left: 0,
          color: 'primary.main',
          strokeLinecap: 'round',
          '& .MuiCircularProgress-circle': {
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
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>
          {percent}%
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', textTransform: 'uppercase', fontSize: 9, fontWeight: 700, letterSpacing: 1, mt: 0.5 }}>
          Complete
        </Typography>
      </Box>
    </Box>
  );
}
