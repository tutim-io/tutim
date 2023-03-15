import React from 'react';
import { Field } from '@tutim/types';
import { Checkbox, FormControlLabel, Grid, FormGroup } from '@mui/material';
import { FieldWrapper } from './utils';

const handleChange = (optionValue, currentValue, onChange) => {
  const newValues = currentValue.includes(optionValue)
    ? currentValue.filter((value) => value !== optionValue)
    : [...currentValue, optionValue];

  onChange(newValues);
};

export const MultiCheckboxField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { options = [], isDisabled, custom } = fieldConfig;

  const isHorizontal = custom?.orientation === 'vertical' ? false : true;

  const childOptions = options.map((option) => (
    <Grid item key={option.value}>
      <FormControlLabel
        control={
          <Checkbox
            checked={value.includes(option.value)}
            onChange={() => handleChange(option.value, value, onChange)}
            disabled={isDisabled || option.disabled}
          />
        }
        label={option.label}
      />
    </Grid>
  ));

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <FormGroup row={isHorizontal}>
        <Grid container direction={isHorizontal ? 'row' : 'column'} alignItems={isHorizontal ? 'center' : 'flex-start'}>
          {childOptions}
        </Grid>
      </FormGroup>
    </FieldWrapper>
  );
};
