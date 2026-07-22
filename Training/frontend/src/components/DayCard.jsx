import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { 
  CheckCircleOutlined as CheckCircleOutlineIcon, 
  HourglassEmpty as HourglassEmptyIcon, 
  ArrowForward as ArrowForwardIcon,
  Code as CodeIcon,
  AutoStories as BookIcon,
  Terminal as TerminalIcon,
  Dns as DnsIcon,
  Storage as StorageIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { LEARNING_PATHS, getDayLearningPath } from '../utils/learningPaths';

const getPathIcon = (iconName) => {
  switch (iconName) {
    case 'code': return <CodeIcon sx={{ fontSize: '1.2rem' }} />;
    case 'book': return <BookIcon sx={{ fontSize: '1.2rem' }} />;
    case 'storage': return <StorageIcon sx={{ fontSize: '1.2rem' }} />;
    case 'terminal': return <TerminalIcon sx={{ fontSize: '1.2rem' }} />;
    case 'dns': return <DnsIcon sx={{ fontSize: '1.2rem' }} />;
    default: return <CodeIcon sx={{ fontSize: '1.2rem' }} />;
  }
};

export default function DayCard({ day, item, onClick, onToggleProgress }) {
  const pathId = getDayLearningPath(day);
  const pathConfig = LEARNING_PATHS.find(p => p.id === pathId) || LEARNING_PATHS[0];
  const isDone = item.completed;

  return (
    <Card
      onClick={onClick}
      sx={{
        position: 'relative',
        backgroundColor: 'background.paper',
        borderRadius: 4,
        cursor: 'pointer',
        borderTop: `4px solid #10b981`,
        borderLeft: '1px solid',
        borderRight: '1px solid',
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        margin: 0,
        boxShadow: (theme) => theme.palette.mode === 'light' 
          ? '0 8px 24px -4px rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.02)'
          : '0 8px 24px -4px rgba(0, 0, 0, 0.35), 0 4px 12px -2px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: '#10b981',
          boxShadow: (theme) => theme.palette.mode === 'light'
            ? `0 20px 30px -10px rgba(15, 23, 42, 0.1), 0 10px 20px -8px rgba(15, 23, 42, 0.05)`
            : `0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 10px 20px -8px rgba(0, 0, 0, 0.3)`,
          '& .arrow-icon': {
            transform: 'translateX(4px)',
          },
        },
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, '&:last-child': { pb: 3 } }}>
        {/* Card Header Status Badges */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={`Day ${String(day).padStart(2, '0')}`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: '0.65rem',
                backgroundColor: 'rgba(16, 185, 129, 0.04)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                textTransform: 'uppercase',
              }}
            />
            <Chip
              label={pathConfig.difficulty}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 700,
                fontSize: '0.62rem',
                height: 20,
                color: 'text.disabled',
                borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.12)',
              }}
            />
            <Chip
              label={`+100 XP`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: '0.62rem',
                height: 20,
                backgroundColor: 'rgba(245, 158, 11, 0.04)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.15)'
              }}
            />
          </Box>
          
          {isDone ? (
            <Chip
              icon={<CheckCircleOutlineIcon style={{ color: 'inherit', fontSize: '0.85rem' }} />}
              label="Completed"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleProgress) onToggleProgress(parseInt(day), false);
              }}
              sx={{
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                color: 'success.main',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(16, 185, 129, 0.14)',
                }
              }}
            />
          ) : (
            <Chip
              icon={<HourglassEmptyIcon style={{ color: 'inherit', fontSize: '0.85rem' }} />}
              label="Pending"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleProgress) onToggleProgress(parseInt(day), true);
              }}
              sx={{
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                color: 'warning.main',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(245, 158, 11, 0.14)',
                }
              }}
            />
          )}
        </Box>

        {/* Card Title & Description */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Box sx={{ color: '#10b981', mt: 0.3, flexShrink: 0 }}>
              {getPathIcon(pathConfig.iconName)}
            </Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 800, 
                color: 'text.primary', 
                lineHeight: 1.35,
                fontSize: '0.98rem',
                letterSpacing: '-0.01em'
              }}
            >
              {item.title}
            </Typography>
          </Box>
          
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.55,
              fontSize: '0.92rem',
              fontWeight: 500,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              pl: 3.2
            }}
          >
            {item.desc}
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.5, pl: 3.2, mt: 0.5, flexWrap: 'wrap' }}>
            {pathConfig.companies.map((c, idx) => (
              <Chip key={idx} label={c} size="small" variant="outlined" sx={{ fontSize: '0.62rem', height: 18, color: 'text.disabled' }} />
            ))}
          </Box>
        </Box>

        {/* Card Footer Actions */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            borderTop: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.06)',
            pt: 2,
            mt: 0.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 3.2 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: '0.65rem' }}>
              Path: {pathConfig.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: '0.85rem', color: 'text.disabled' }} />
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                {(() => {
                  const dayNum = parseInt(day);
                  if (dayNum === 1 || dayNum === 3 || dayNum === 4) return "45 Mins";
                  if (dayNum === 2 || dayNum === 5 || dayNum === 6) return "1.0 Hr";
                  if (dayNum === 7) return "2.0 Hrs";
                  if (dayNum >= 8 && dayNum <= 9) return "2.0 Hrs";
                  if (dayNum === 10) return "1.5 Hrs";
                  if (dayNum === 11) return "1.5 Hrs";
                  if (dayNum === 12) return "3.0 Hrs";
                  if (dayNum >= 13 && dayNum <= 17) return "3.0 Hrs";
                  if (dayNum === 18) return "5.0 Hrs";
                  if (dayNum >= 19 && dayNum <= 20) return "3.0 Hrs";
                  if (dayNum >= 21 && dayNum <= 22) return "2.0 Hrs";
                  if (dayNum >= 23 && dayNum <= 24) return "3.0 Hrs";
                  if (dayNum >= 25 && dayNum <= 28) return "3.0 Hrs";
                  if (dayNum === 29) return "2.0 Hrs";
                  if (dayNum === 30) return "4.0 Hrs";
                  return "1.5 Hrs";
                })()}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            endIcon={<ArrowForwardIcon className="arrow-icon" sx={{ fontSize: '0.85rem', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.78rem',
              py: 0.8,
              borderRadius: 2.5,
              borderColor: `rgba(16, 185, 129, 0.25)`,
              backgroundColor: 'rgba(16, 185, 129, 0.04)',
              color: '#10b981',
              boxShadow: 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                boxShadow: `0 4px 12px rgba(16, 185, 129, 0.15)`,
              }
            }}
          >
            Explore Concept ↗
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
