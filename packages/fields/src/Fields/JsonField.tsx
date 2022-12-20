import React from 'react';
import { Field } from '@tutim/types';
import { FormHelperText, FormControl, FormLabel } from '@mui/material';
import ReactJson from 'react-json-view';

export const JsonField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};
  const onEdit = onChange ? ({ updated_src }: any) => onChange(updated_src) : undefined;

  return (
    <FormControl key={key} required={isRequired} disabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <ReactJson src={value || {}} onAdd={onEdit} onEdit={onEdit} onDelete={onEdit} />
      {!!error && (
        <FormHelperText error sx={{ px: 2 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
