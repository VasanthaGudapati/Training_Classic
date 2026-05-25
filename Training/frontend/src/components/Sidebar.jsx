import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ProgressRing from './ProgressRing';
import {
  RocketLaunch as RocketLaunchIcon,
  SelectAll as SelectAllIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Dns as DnsIcon,
  Storage as StorageIcon,
  AutoStories as AutoStoriesIcon
} from '@mui/icons-material';

const MODULES = [
  { id: 'all', label: 'All Modules', icon: <SelectAllIcon /> },
  { id: '1. Foundations & Basic Data Structures', label: '1. Foundations & Arrays', icon: <CodeIcon /> },
  { id: '2. OOP & Intermediate Data Structures', label: '2. OOP & DSA Basics', icon: <AutoStoriesIcon /> },
  { id: '3. OS Basics & Systems Programming', label: '3. OS & Multi-threading', icon: <TerminalIcon /> },
  { id: '4. Computer Networks & Web Communication', label: '4. Networks & Web Basics', icon: <DnsIcon /> },
  { id: '5. Database Basics & Data Persistence', label: '5. SQL & Databases', icon: <StorageIcon /> },
];

export default function Sidebar({ completedCount, totalCount, activeFilter, onFilterChange }) {
  const pendingCount = totalCount - completedCount;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Box
      sx={{
        width: 320,
        height: '100%',
        backgroundColor: 'background.paper',
        borderRight: '1px solid rgba(15, 23, 42, 0.08)',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Header Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <RocketLaunchIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1.2 }}>
            Core CS Revision
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
            30-Day Practical Challenge
          </Typography>
        </Box>
      </Box>

      {/* Progress Card Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2.5,
          padding: 2.5,
          background: 'rgba(15, 23, 42, 0.02)',
          borderRadius: 4,
          border: '1px solid rgba(15, 23, 42, 0.08)',
        }}
      >
        <ProgressRing percent={percent} />
        
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
              {completedCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>
              Done
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              {pendingCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>
              Pending
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Filter Links List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1, overflowY: 'auto', pr: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', pl: 1, mb: 0.5 }}>
          MODULE INDEX
        </Typography>
        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {MODULES.map((mod) => {
            const isActive = activeFilter === mod.id;
            return (
              <ListItem key={mod.id} disablePadding>
                <ListItemButton
                  onClick={() => onFilterChange(mod.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    px: 1.5,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    backgroundColor: isActive ? 'rgba(15, 23, 42, 0.04)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(15, 23, 42, 0.12)' : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: isActive ? 'rgba(15, 23, 42, 0.06)' : 'rgba(15, 23, 42, 0.02)',
                      color: 'text.primary',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: isActive ? 'primary.main' : 'text.disabled' }}>
                    {mod.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={mod.label} 
                    primaryTypographyProps={{ sx: { fontSize: '0.85rem', fontWeight: isActive ? 600 : 500 } }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)' }} />
      
      <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center', lineHeight: 1.4, px: 1 }}>
        💡 Click a card to view specs or execute python code in your editor.
      </Typography>
    </Box>
  );
}
