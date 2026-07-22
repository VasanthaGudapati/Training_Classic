import React from 'react';
import { Grid, Box, Typography, Paper, LinearProgress } from '@mui/material';
import DayCard from './DayCard';
import { LEARNING_PATHS, getDayLearningPath } from '../utils/learningPaths';

export default function DashboardGrid({ curriculumData, activeFilter, onCardClick, onToggleProgress, searchQuery }) {
  // Filter days based on path selection and search query
  const filteredDays = Object.entries(curriculumData).filter(([day, item]) => {
    if (day === '0' || day === 0) return false;
    
    // Path filter
    const matchesPath = activeFilter === 'all' || getDayLearningPath(day) === activeFilter;
    
    // Search query filter
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.module.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesPath && matchesSearch;
  });

  // Calculate progress for a specific path ID
  const getPathStats = (pathId) => {
    const days = Object.entries(curriculumData).filter(([day]) => {
      return day !== '0' && day !== 0 && getDayLearningPath(day) === pathId;
    });
    const completed = days.filter(([_, item]) => item.completed).length;
    const total = days.length || 1;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  // Only show active paths in the progress banner (having >0 lessons in our 30 days)
  const activePaths = LEARNING_PATHS.filter(path => {
    const stats = getPathStats(path.id);
    return stats.total > 0;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, maxWidth: 900, mx: 'auto', width: '100%' }}>
      {/* Visual Path Progress Bars (Rendered when 'All' filter is active) */}
      {activeFilter === 'all' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.disabled', 
              fontWeight: 800, 
              letterSpacing: 1.2, 
              textTransform: 'uppercase',
              fontSize: '0.68rem'
            }}
          >
            Learning Path Progress Trackers
          </Typography>
          <Grid container spacing={2}>
            {activePaths.slice(0, 5).map((path) => {
              const stats = getPathStats(path.id);
              return (
                <Grid item xs={12} sm={6} md={2.4} key={path.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                      backgroundColor: 'background.paper',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.2,
                      boxShadow: (theme) => theme.palette.mode === 'light'
                        ? '0 4px 12px rgba(15, 23, 42, 0.01)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.72rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '75%' }}>
                        {path.title}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace" }}>
                        {stats.completed}/{stats.total}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stats.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'success.main',
                          borderRadius: 3,
                        }
                      }}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Cards List - Parent controls width. Cards span 100% of parent */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
        {filteredDays.map(([day, item]) => (
          <DayCard
            key={day}
            day={day}
            item={item}
            onClick={() => onCardClick(day)}
            onToggleProgress={onToggleProgress}
          />
        ))}
      </Box>
    </Box>
  );
}
