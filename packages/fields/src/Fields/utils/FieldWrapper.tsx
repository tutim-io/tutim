import React from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { Label } from './Label';

export const FieldWrapper: React.FC<{ fieldConfig: any; fieldState: any; children: any }> = ({
  fieldConfig,
  fieldState,
  children,
}) => {
  const { key, label, isRequired, isDisabled, tooltip } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  return (
    <FormControl key={key} required={isRequired} disabled={isDisabled} component="fieldset" sx={{ width: '100%' }}>
      <Label label={label} tooltip={tooltip} />
      {children}
      {!!error && (
        <FormHelperText error sx={{ px: 2 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
