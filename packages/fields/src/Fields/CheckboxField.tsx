import { Field } from '@tutim/types';
import { Checkbox, FormControlLabel } from '@mui/material';
import { FieldWrapper } from './utils';

export const CheckboxField: Field = ({ fieldConfig, inputProps: { value = false, onChange }, fieldState }) => {
  const { key, helperText } = fieldConfig;

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <FormControlLabel label={helperText} control={<Checkbox key={key} checked={value} onChange={onChange} />} />
    </FieldWrapper>
  );
};
