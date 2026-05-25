import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function TerminalConsole({ output, exitCode, isRunning }) {
  const bodyRef = useRef(null);

  // Auto-scroll terminal to bottom as text arrives
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [output, isRunning]);

  // Determine borders based on exit codes
  let borderLeftColor = 'rgba(255, 255, 255, 0.08)';
  if (exitCode === 0) {
    borderLeftColor = '#34d399'; // success green
  } else if (exitCode !== null) {
    borderLeftColor = '#f87171'; // error red
  }

  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: '#020617',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderLeft: '4px solid',
        borderLeftColor: borderLeftColor,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        mt: 1.5,
      }}
    >
      {/* Console Header Bar */}
      <Box
        sx={{
          backgroundColor: '#0b0f19',
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          gap: 0.8,
        }}
      >
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
        
        <Typography
          variant="caption"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'text.disabled',
            fontWeight: 600,
            ml: 1,
          }}
        >
          Execution Console
        </Typography>
      </Box>

      {/* Console Print Output Logs */}
      <Box
        ref={bodyRef}
        component="pre"
        sx={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem',
          color: '#f8fafc',
          p: 2.5,
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          height: 200,
          overflowY: 'auto',
          lineHeight: 1.5,
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
          },
        }}
      >
        {output}
        {isRunning && "\n⌛ Running script..."}
      </Box>
    </Paper>
  );
}
