import React from 'react';
import { Field } from '@tutim/types';
import { TextField as MuiTextField } from '@mui/material';

export const NumberField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.valueAsNumber);
  };

  return (
    <MuiTextField
      onChange={onInputChange}
      value={value || ''}
      type="number"
      InputLabelProps={{ shrink: true }}
      fullWidth
      error={!!error?.message}
      helperText={error?.message}
      size="small"
      key={key}
      label={label}
      required={isRequired}
      disabled={isDisabled}
    />
  );
};
