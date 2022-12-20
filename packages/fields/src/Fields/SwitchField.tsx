import React from 'react';
import { Field } from '@tutim/types';
import { Switch, FormHelperText, FormControl, FormControlLabel } from '@mui/material';

export const SwitchField: Field = ({ fieldConfig, inputProps: { value = false, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  return (
    <FormControl required={isRequired} disabled={isDisabled}>
      <FormControlLabel label={label} control={<Switch key={key} checked={value} onChange={onChange} />} />
      {!!error && (
        <FormHelperText error sx={{ px: 2 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
