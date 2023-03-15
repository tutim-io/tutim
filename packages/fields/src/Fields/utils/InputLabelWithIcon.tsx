import React from 'react';
import { Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface InputLabelWithTooltipProps {
  label: string;
  tooltip?: string;
}

export const InputLabelWithTooltip: React.FC<InputLabelWithTooltipProps> = ({ label, tooltip }) => {
  const tooltipIcon = (
    <Tooltip title={tooltip || ''} arrow>
      <IconButton size="small" edge="end">
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1">{label}</Typography>
      {tooltip && tooltipIcon}
    </div>
  );
};
