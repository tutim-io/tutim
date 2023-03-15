import React from 'react';
import { Field } from '@tutim/types';
import { TextField as MuiTextField } from '@mui/material';
import { InputLabelWithTooltip } from './utils';

export const TextAreaField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled, placeholder, tooltip, helperText } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <>
      <InputLabelWithTooltip label={label || key} tooltip={tooltip} />
      <MuiTextField
        onChange={onInputChange}
        value={value || ''}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          placeholder: placeholder,
        }}
        multiline
        rows={4}
        fullWidth
        error={!!error?.message}
        helperText={error?.message || helperText}
        key={key}
        required={isRequired}
        disabled={isDisabled}
      />
    </>
  );
};
