import React from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { Label } from './Label';

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
