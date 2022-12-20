import React from 'react';
import { Option, Field } from '@tutim/types';
import { Radio, RadioGroup, FormHelperText, FormControl, FormLabel, FormControlLabel } from '@mui/material';

export const RadioField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled, options = [] } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const childOptions = options.map((option: Option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      disabled={option.disabled}
      control={<Radio />}
      label={option.label}
    />
  ));

  return (
    <FormControl required={isRequired} disabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={onChange} name={key}>
        {childOptions}
      </RadioGroup>
      {!!error && (
        <FormHelperText error sx={{ px: 2 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
