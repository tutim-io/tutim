import React from 'react';
import { FormLabel, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface LabelProps {
  label?: string;
  tooltip?: string;
}
export const Label: React.FC<LabelProps> = ({ label, tooltip }) => {
  return (
    <FormLabel component="legend">
      {label}
      {tooltip && (
        <Tooltip title={tooltip || ''} arrow>
          <IconButton size="small" edge="end">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </FormLabel>
  );
};
