import React from 'react';
import { Field } from '@tutim/types';
import { TextField as MuiTextField } from '@mui/material';

export const TextAreaField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <MuiTextField
      onChange={onInputChange}
      value={value || ''}
      InputLabelProps={{ shrink: true }}
      multiline
      rows={4}
      fullWidth
      error={!!error?.message}
      helperText={error?.message}
      key={key}
      label={label}
      required={isRequired}
      disabled={isDisabled}
    />
  );
};
