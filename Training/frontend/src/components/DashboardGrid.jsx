import React from 'react';
import { Grid } from '@mui/material';
import DayCard from './DayCard';

export default function DashboardGrid({ curriculumData, activeFilter, onCardClick }) {
  // Filter days based on module selection
  const filteredDays = Object.entries(curriculumData).filter(([day, item]) => {
    if (day === '0' || day === 0) return false;
    if (activeFilter === 'all') return true;
    return item.module === activeFilter;
  });

  return (
    <Grid container spacing={3} sx={{ alignContent: 'start' }}>
      {filteredDays.map(([day, item]) => (
        <Grid item xs={12} sm={6} md={4} key={day}>
          <DayCard
            day={day}
            item={item}
            onClick={() => onCardClick(day)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
