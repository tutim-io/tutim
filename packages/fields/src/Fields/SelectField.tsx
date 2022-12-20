import React from 'react';
import { Option, Field } from '@tutim/types';
import { TextField as MuiTextField, MenuItem as MuiMenuItem } from '@mui/material';

export const SelectField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled, options = [] } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const childOptions = options.map((option: Option) => (
    <MuiMenuItem disabled={option.disabled} key={option.value} value={option.value}>
      {option.label}
    </MuiMenuItem>
  ));

  return (
    <MuiTextField
      value={value || ''}
      onChange={onChange}
      key={key}
      label={label}
      select
      fullWidth
      InputLabelProps={{ shrink: true }}
      SelectProps={{ native: false }}
      error={!!error?.message}
      helperText={error?.message}
      size="small"
      required={isRequired}
      disabled={isDisabled}
    >
      {childOptions}
    </MuiTextField>
  );
};
