import React from 'react';
import { Option, Field } from '@tutim/types';
import { Radio, RadioGroup, FormHelperText, FormControl, FormLabel, FormControlLabel, Grid } from '@mui/material';

export const RadioField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled, options = [], custom } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};
  const isHorizontal = custom?.orientation === 'vertical' ? false : true;

  const childOptions = options.map((option: Option) => (
    <Grid item key={option.value}>
      <FormControlLabel value={option.value} disabled={option.disabled} control={<Radio />} label={option.label} />
    </Grid>
  ));

  return (
    <FormControl required={isRequired} disabled={isDisabled} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup value={value} onChange={onChange} name={key} row={isHorizontal}>
        <Grid container direction={isHorizontal ? 'row' : 'column'} alignItems={isHorizontal ? 'center' : 'flex-start'}>
          {childOptions}
        </Grid>
      </RadioGroup>
      {!!error && (
        <FormHelperText error sx={{ px: 2 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
