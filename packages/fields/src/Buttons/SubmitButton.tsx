import React from 'react';
import Button from '@mui/material/Button';

export const SubmitButton = ({ label = 'Submit' }: { label?: string }) => {
  return (
    <Button type="submit" variant="contained">
      {label}
    </Button>
  );
};
