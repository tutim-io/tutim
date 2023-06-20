import React from 'react';
import { FormControl, FormHelperText, FormLabel, Tooltip, IconButton } from '@mui/material';
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

export const FieldWrapper: React.FC<{ fieldConfig: any; fieldState: any; children: any }> = ({
  fieldConfig,
  fieldState,
  children,
}) => {
  const { key, label, isRequired, isDisabled, tooltip, helperText } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};
  const showError = !!error.message;

  return (
    <FormControl key={key} required={isRequired} disabled={isDisabled} component="fieldset" sx={{ width: '100%' }}>
      <Label label={label} tooltip={tooltip} />
      {children}
      {showError ? (
        <FormHelperText error>{error.message}</FormHelperText>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
