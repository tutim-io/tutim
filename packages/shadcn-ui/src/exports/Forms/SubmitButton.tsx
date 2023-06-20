import React from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { FormLayout } from '@tutim/types';

export const SubmitButton = ({ label = 'Submit', display = true }: FormLayout['submit'] = {}) => {
  if (!display) return null;
  return (
    <Box key="submit" sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
      <Button type="submit" variant="contained">
        {label}
      </Button>
    </Box>
  );
};
