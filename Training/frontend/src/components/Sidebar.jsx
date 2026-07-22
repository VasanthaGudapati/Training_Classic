import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material';
import ProgressRing from './ProgressRing';
import {
  SelectAll as SelectAllIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Dns as DnsIcon,
  Storage as StorageIcon,
  AutoStories as AutoStoriesIcon,
  LocalFireDepartment as StreakIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { LEARNING_PATHS, getDayLearningPath } from '../utils/learningPaths';

const getPathIcon = (iconName) => {
  switch (iconName) {
    case 'code': return <CodeIcon sx={{ fontSize: '1.05rem' }} />;
    case 'book': return <AutoStoriesIcon sx={{ fontSize: '1.05rem' }} />;
    case 'storage': return <StorageIcon sx={{ fontSize: '1.05rem' }} />;
    case 'terminal': return <TerminalIcon sx={{ fontSize: '1.05rem' }} />;
    case 'dns': return <DnsIcon sx={{ fontSize: '1.05rem' }} />;
    default: return <CodeIcon sx={{ fontSize: '1.05rem' }} />;
  }
};

export default function Sidebar({ completedCount, totalCount, activeFilter, onFilterChange, curriculumData }) {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Streak calculation (completed days in a row)
  const getStreak = () => {
    if (!curriculumData) return 0;
    let streak = 0;
    for (let d = 1; d <= 30; d++) {
      if (curriculumData[d]?.completed) {
        streak++;
      } else {
        break; // break streak on first uncompleted day
      }
    }
    return streak;
  };

  const streakCount = getStreak();

  // Get completed / total for each module
  const getPathProgress = (pathId) => {
    if (!curriculumData) return { completed: 0, total: 0 };
    if (pathId === 'all') return { completed: completedCount, total: totalCount };
    
    const pathDays = Object.entries(curriculumData).filter(([day]) => {
      if (day === '0' || day === 0) return false;
      return getDayLearningPath(day) === pathId;
    });
    
    const completed = pathDays.filter(([_, item]) => item.completed).length;
    return { completed, total: pathDays.length };
  };

  // Motivational lines
  let motivation = "Every journey begins with a single step! Start Day 1.";
  if (percent > 0 && percent < 20) motivation = "Off to a great start! Keep pushing. 🚀";
  else if (percent >= 20 && percent < 50) motivation = "Doing great! Consistency is key. ✨";
  else if (percent >= 50 && percent < 80) motivation = "Over halfway there! Great momentum. 💪";
  else if (percent >= 80 && percent < 100) motivation = "Almost at the finish line! Keep it up. 🎓";
  else if (percent === 100) motivation = "Incredible! You completed the challenge! 🎉";

  return (
    <Box
      sx={{
        width: 260,
        height: '100%',
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
        padding: 2.5,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 3,
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* High-Impact Progress Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2.5,
          background: (theme) => theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(14, 165, 233, 0.03) 100%)' 
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)',
          borderRadius: 4,
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.2)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.01)'
        }}
      >
        <ProgressRing percent={percent} size={110} />
        
        <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', mt: 2, fontSize: '0.82rem' }}>
          {completedCount} of {totalCount} Days Completed
        </Typography>
        
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary', 
            fontStyle: 'italic', 
            textAlign: 'center', 
            px: 1, 
            mt: 0.8, 
            fontSize: '0.7rem',
            lineHeight: 1.3
          }}
        >
          "{motivation}"
        </Typography>

        {streakCount > 0 && (
          <Chip
            icon={<StreakIcon sx={{ color: '#f59e0b !important', fontSize: '0.9rem' }} />}
            label={`${streakCount} Day Streak`}
            size="small"
            sx={{
              mt: 1.5,
              fontWeight: 700,
              fontSize: '0.68rem',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              color: '#f59e0b',
              border: '1px solid rgba(245, 158, 11, 0.12)'
            }}
          />
        )}
      </Box>

      {/* Navigation Filter Links List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1, overflowY: 'auto', pr: 0.5 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.disabled', 
            fontWeight: 800, 
            letterSpacing: 1.2, 
            textTransform: 'uppercase', 
            pl: 1, 
            mb: 0.5,
            fontSize: '0.68rem'
          }}
        >
          LEARNING PATHS
        </Typography>
        
        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* All Paths option */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => onFilterChange('all')}
              sx={{
                borderRadius: '8px',
                py: 0.8,
                px: 1.5,
                color: activeFilter === 'all' ? 'success.main' : 'text.secondary',
                backgroundColor: activeFilter === 'all'
                  ? (theme) => theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.1)'
                  : 'transparent',
                borderLeft: '4px solid',
                borderColor: activeFilter === 'all' ? 'success.main' : 'transparent',
                '&:hover': {
                  backgroundColor: activeFilter === 'all'
                    ? (theme) => theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.09)' : 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(0,0,0,0.02)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 28, color: activeFilter === 'all' ? 'success.main' : 'text.disabled' }}>
                <SelectAllIcon sx={{ fontSize: '1.05rem' }} />
              </ListItemIcon>
              <ListItemText primary="All Learning Paths" primaryTypographyProps={{ sx: { fontSize: '0.78rem', fontWeight: activeFilter === 'all' ? 700 : 500 } }} />
            </ListItemButton>
          </ListItem>

          {/* Individual Paths */}
          {LEARNING_PATHS.map((path) => {
            const isActive = activeFilter === path.id;
            const progress = getPathProgress(path.id);
            if (progress.total === 0 && path.id !== 'path_10' && path.id !== 'path_11') return null; // hide paths with 0 lessons
            
            return (
              <ListItem key={path.id} disablePadding>
                <ListItemButton
                  onClick={() => onFilterChange(path.id)}
                  sx={{
                    borderRadius: '8px',
                    py: 0.8,
                    px: 1.5,
                    color: isActive ? 'success.main' : 'text.secondary',
                    backgroundColor: isActive 
                      ? (theme) => theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.1)' 
                      : 'transparent',
                    borderLeft: '4px solid',
                    borderColor: isActive ? 'success.main' : 'transparent',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: isActive 
                        ? (theme) => theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.09)' : 'rgba(16, 185, 129, 0.15)' 
                        : (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.02)' : 'rgba(255, 255, 255, 0.04)',
                      color: isActive ? 'success.main' : 'text.primary',
                      transform: 'translateX(2px)'
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 28, color: isActive ? 'success.main' : 'text.disabled' }}>
                    {getPathIcon(path.iconName)}
                  </ListItemIcon>
                  
                  <ListItemText 
                    primary={path.title} 
                    primaryTypographyProps={{ 
                      sx: { 
                        fontSize: '0.75rem', 
                        fontWeight: isActive ? 700 : 500,
                        lineHeight: 1.2
                      } 
                    }} 
                  />

                  {progress.total > 0 && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: '0.65rem', 
                        fontWeight: 700, 
                        color: isActive ? 'success.main' : 'text.disabled',
                        ml: 1,
                        backgroundColor: isActive 
                          ? (theme) => theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.2)'
                          : (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)',
                        px: 0.8,
                        py: 0.2,
                        borderRadius: 1.5,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {progress.completed}/{progress.total}
                    </Typography>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)' }} />
      
      <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center', lineHeight: 1.4, px: 1, fontSize: '0.68rem' }}>
        💡 Select a Learning Path to filter your syllabus cards and check your study levels.
      </Typography>
    </Box>
  );
}
