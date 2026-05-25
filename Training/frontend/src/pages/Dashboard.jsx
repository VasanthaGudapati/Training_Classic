import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Divider,
  Paper
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Home as HomeIcon,
  MenuBook as ModulesIcon,
  Code as CodeIcon,
  PlaylistAddCheck as TasksIcon,
  CheckCircle as CheckedIcon,
  RadioButtonUnchecked as UncheckedIcon,
  ArrowForward as ArrowForwardIcon,
  RocketLaunch as LogoIcon
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import DashboardGrid from '../components/DashboardGrid';
import { useAuth } from '../context/AuthContext';

export default function Dashboard({ curriculumData, activeFilter, onFilterChange, fetchStatus, loading }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  
  const mainContentRef = useRef(null);
  const modulesGridRef = useRef(null);
  
  const [tasksOpen, setTasksOpen] = useState(false);

  // Handle automatic scrolling to modules segment on load when requested
  useEffect(() => {
    if (searchParams.get('scroll') === 'modules') {
      setTimeout(() => {
        modulesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  }, [searchParams]);


  // Compute total and completed counts (excluding Day 0 Warmup)
  const totalCount = Object.keys(curriculumData).filter(day => day !== '0' && day !== 0).length;
  const completedCount = Object.entries(curriculumData).filter(([day, item]) => day !== '0' && day !== 0 && item.exists).length;

  const handleCardClick = (day) => {
    navigate(`/playground/${day}`);
  };

  const handleHomeClick = () => {
    // Scroll dashboard content panel to the very top
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    onFilterChange('all');
  };

  const handleModulesClick = () => {
    // Scroll dashboard directly down to the Modules Grid
    modulesGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePracticeClick = () => {
    // Proactively scan for the first uncompleted day, or default to Day 1
    let targetDay = 1;
    for (let d = 1; d <= 30; d++) {
      if (curriculumData[d] && !curriculumData[d].exists) {
        targetDay = d;
        break;
      }
    }
    navigate(`/playground/${targetDay}`);
  };

  const avatarLetter = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#ffffff' }}>
      
      {/* ==========================================
         TOP PREMIUM NAVIGATION BAR
         ========================================== */}
      <Box
        component="header"
        sx={{
          height: 72,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.01)',
        }}
      >
        {/* Brand Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={handleHomeClick}>
          <LogoIcon sx={{ fontSize: '1.8rem', color: 'primary.main' }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Core CS Revision
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, fontSize: '0.68rem', letterSpacing: 0.5 }}>
              30-DAY CHALLENGE
            </Typography>
          </Box>
        </Box>

        {/* Center Nav Options */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            onClick={handleHomeClick}
            startIcon={<HomeIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              color: 'text.primary',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
              },
            }}
          >
            Home
          </Button>

          <Button
            onClick={handleModulesClick}
            startIcon={<ModulesIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              color: 'text.secondary',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                color: 'text.primary',
              },
            }}
          >
            Core Modules
          </Button>

          <Button
            onClick={handlePracticeClick}
            startIcon={<CodeIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              color: 'text.secondary',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                color: 'text.primary',
              },
            }}
          >
            Practice Coding
          </Button>

          <Button
            onClick={() => setTasksOpen(true)}
            startIcon={<TasksIcon sx={{ fontSize: '1.1rem !important' }} />}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2.5,
              backgroundColor: 'rgba(16, 185, 129, 0.06)',
              color: 'success.main',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
              },
            }}
          >
            Daily Tasks
          </Button>
        </Box>

        {/* Right Session Utilities */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Tooltip title={`Signed in as: ${user.email}`} arrow>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
                  border: '2px solid rgba(15, 23, 42, 0.05)',
                  cursor: 'pointer',
                }}
              >
                {avatarLetter}
              </Avatar>
            </Tooltip>
          )}

          <Tooltip title="Log Out Session" arrow>
            <IconButton
              onClick={logout}
              sx={{
                border: '1px solid rgba(239, 68, 68, 0.15)',
                backgroundColor: 'rgba(239, 68, 68, 0.02)',
                color: 'error.main',
                p: 1.2,
                borderRadius: 2.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ==========================================
         SUB-HEADER SIDEBAR & MAIN BODY SECTION
         ========================================== */}
      <Box sx={{ display: 'flex', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* Left Drawer Filtering Sidebar */}
        <Sidebar
          completedCount={completedCount}
          totalCount={totalCount}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />

        {/* Right Main Scrollable Curriculum Container */}
        <Box
          component="main"
          ref={mainContentRef}
          sx={{
            flexGrow: 1,
            height: '100%',
            padding: 4,
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(15, 23, 42, 0.05)',
              borderRadius: 4,
            },
          }}
        >
          {/* Header Modules Focus Row */}
          <Box sx={{ borderBottom: '1px solid rgba(15, 23, 42, 0.06)', pb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
              CURRICULUM ROADMAP
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, fontSize: '0.85rem' }}>
              Select a concept from the index to begin deep-dives and practice exercises.
            </Typography>
          </Box>

          {loading && Object.keys(curriculumData).length === 0 ? (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', color: 'text.secondary' }}>
              <Typography variant="h6">⌛ Loading curriculum status...</Typography>
            </Box>
          ) : (
            <>
              {/* Special Day 0 Warmup Card */}
              {(activeFilter === 'all' || activeFilter.includes('Foundations')) && curriculumData[0] && (
                <Box
                  onClick={() => handleCardClick(0)}
                  sx={{
                    cursor: 'pointer',
                    p: 3.5,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      border: '1px solid rgba(15, 23, 42, 0.16)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                    },
                    mb: 1,
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <Chip
                        label="⭐ Warmup & Overview"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          backgroundColor: 'rgba(15, 23, 42, 0.06)',
                          color: 'primary.main',
                          fontSize: '0.7rem',
                        }}
                      />
                      {curriculumData[0].exists && (
                        <Chip
                          label="Completed"
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.8, letterSpacing: '-0.01em' }}>
                      Day 0: Core CS Syllabus & Preparation
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 800, lineHeight: 1.6, fontSize: '0.88rem' }}>
                      Welcome to the Core Computer Science practical revision program! Click here to explore the dynamic Roadmap layer by layer across Foundations, Data Structures, OOP, OS, Networks, and Databases, and start warm-up scripts.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      px: 3.5,
                      py: 1.5,
                      borderRadius: 2.5,
                      backgroundColor: 'primary.main',
                      color: '#ffffff',
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: 'none',
                      flexShrink: 0,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }}
                  >
                    Explore Roadmap
                  </Button>
                </Box>
              )}

              {/* Scroll anchor grid target box */}
              <Box ref={modulesGridRef}>
                <DashboardGrid
                  curriculumData={curriculumData}
                  activeFilter={activeFilter}
                  onCardClick={handleCardClick}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* ==========================================
         RIGHT SLIDING DRAWER: DAILY CS TASKS
         ========================================== */}
      <Drawer
        anchor="right"
        open={tasksOpen}
        onClose={() => setTasksOpen(false)}
        PaperProps={{
          sx: {
            width: 420,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: '#ffffff',
            boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.05)',
            borderLeft: '1px solid rgba(15, 23, 42, 0.08)',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Daily Checklist Tasks
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Syllabus Completion
            </Typography>
          </Box>
          <Chip
            label={`${completedCount}/30 Done`}
            color="success"
            sx={{ fontWeight: 700, fontSize: '0.78rem' }}
          />
        </Box>

        <Divider />

        {/* Scrollable list of 30 days tasks */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            pr: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            '&::-webkit-scrollbar': {
              width: 5,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(15, 23, 42, 0.06)',
              borderRadius: 3,
            }
          }}
        >
          <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Object.entries(curriculumData)
              .filter(([day]) => day !== '0' && day !== 0) // exclude day 0
              .map(([day, task]) => {
                const dayNum = parseInt(day);
                const isDone = task.exists;
                return (
                  <Paper
                    key={day}
                    elevation={0}
                    sx={{
                      border: '1px solid rgba(15, 23, 42, 0.06)',
                      borderRadius: 3,
                      backgroundColor: isDone ? 'rgba(16, 185, 129, 0.02)' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'rgba(15, 23, 42, 0.15)',
                        backgroundColor: 'rgba(15, 23, 42, 0.02)',
                        transform: 'translateX(-2px)',
                      }
                    }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setTasksOpen(false);
                          navigate(`/playground/${dayNum}`);
                        }}
                        sx={{ py: 1.5, px: 2, borderRadius: 3 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Checkbox
                            checked={isDone}
                            readOnly
                            icon={<UncheckedIcon sx={{ fontSize: '1.2rem', color: 'text.disabled' }} />}
                            checkedIcon={<CheckedIcon sx={{ fontSize: '1.2rem', color: 'success.main' }} />}
                            sx={{ p: 0 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Day ${dayNum}: ${task.title}`}
                          secondary={task.module.split('. ')[1] || task.module}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: isDone ? 'text.secondary' : 'text.primary',
                              textDecoration: isDone ? 'line-through' : 'none',
                              lineHeight: 1.3
                            }
                          }}
                          secondaryTypographyProps={{
                            sx: {
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              color: isDone ? 'text.disabled' : 'text.disabled',
                              mt: 0.3
                            }
                          }}
                        />
                        <ArrowForwardIcon sx={{ fontSize: '1rem', color: 'text.disabled', ml: 1 }} />
                      </ListItemButton>
                    </ListItem>
                  </Paper>
                );
              })}
          </List>
        </Box>
      </Drawer>

    </Box>
  );
}
