import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { CheckCircleOutlined as CheckCircleOutlineIcon, HourglassEmpty as HourglassEmptyIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

export default function DayCard({ day, item, onClick }) {
  const shortModule = item.module.split('.')[0];

  return (
    <Card
      onClick={onClick}
      sx={{
        position: 'relative',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(15, 23, 42, 0.2)',
          boxShadow: '0 12px 24px rgba(15, 23, 42, 0.04)',
          '& .arrow-icon': {
            color: 'primary.main',
            transform: 'translateX(3px)',
          },
        },
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1, '&:last-child': { pb: 3 } }}>
        {/* Card Header Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={`Day ${String(day).padStart(2, '0')}`}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.65rem',
              backgroundColor: item.exists ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.04)',
              color: item.exists ? 'success.main' : 'text.secondary',
              textTransform: 'uppercase',
            }}
          />
          {item.exists ? (
            <Chip
              icon={<CheckCircleOutlineIcon style={{ color: 'inherit', fontSize: '0.9rem' }} />}
              label="Completed"
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                color: 'success.main',
                border: '1px solid rgba(16, 185, 129, 0.12)',
              }}
            />
          ) : (
            <Chip
              icon={<HourglassEmptyIcon style={{ color: 'inherit', fontSize: '0.9rem' }} />}
              label="Pending"
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                color: 'warning.main',
                border: '1px solid rgba(245, 158, 11, 0.12)',
              }}
            />
          )}
        </Box>

        {/* Card Title & Desc */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.4, mb: 1 }}>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.5,
              fontSize: '0.82rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.desc}
          </Typography>
        </Box>

        {/* Card Footer Actions */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            borderTop: '1px solid rgba(15, 23, 42, 0.08)',
            pt: 2,
            mt: 0.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Module {shortModule}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            endIcon={<ArrowForwardIcon className="arrow-icon" sx={{ fontSize: '0.9rem', color: 'primary.main', transition: 'all 0.2s ease' }} />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.78rem',
              py: 0.8,
              borderRadius: 2,
              borderColor: 'rgba(15, 23, 42, 0.12)',
              backgroundColor: 'rgba(15, 23, 42, 0.01)',
              color: 'primary.main',
              boxShadow: 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(15, 23, 42, 0.04)',
                boxShadow: 'none',
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
