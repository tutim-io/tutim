import React from 'react';
import { Radio, RadioGroup as MuiRadioGroup, FormControlLabel, Grid } from '@mui/material';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Option, Field } from '@tutim/types';
import { FieldWrapper } from './utils';

export const RadioField: Field = (props) => {
  const { fieldConfig, inputProps, fieldState } = props;
  const { value, onChange } = inputProps;
  const { options = [], custom } = fieldConfig;

  const isHorizontal = custom?.orientation === 'vertical' ? false : true;

  const childOptions = options.map((option: Option) => (
    <Grid item key={option.value}>
      <FormControlLabel value={option.value} disabled={option.disabled} control={<Radio />} label={option.label} />
    </Grid>
  ));

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <MuiRadioGroup value={value} onChange={onChange} row={isHorizontal}>
        <Grid container direction={isHorizontal ? 'row' : 'column'} alignItems={isHorizontal ? 'center' : 'flex-start'}>
          {childOptions}
        </Grid>
      </MuiRadioGroup>
    </FieldWrapper>
  );
};
