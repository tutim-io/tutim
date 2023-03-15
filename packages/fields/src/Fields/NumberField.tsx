import React from 'react';
import { Field } from '@tutim/types';
import { TextField as MuiTextField } from '@mui/material';
import { FieldWrapper } from './utils';

export const NumberField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, placeholder } = fieldConfig;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.valueAsNumber);
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <MuiTextField
        type="number"
        onChange={onInputChange}
        value={value || ''}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          placeholder: placeholder,
        }}
        fullWidth
        size="small"
        key={key}
        required={isRequired}
        disabled={isDisabled}
      />
    </FieldWrapper>
  );
};
