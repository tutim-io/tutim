import React from 'react';
import MuiButton from '@mui/material/Button';

export const Button = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <MuiButton type="button" variant="contained" onClick={onClick}>
      {label}
    </MuiButton>
  );
};
