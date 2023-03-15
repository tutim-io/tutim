import { Field } from '@tutim/types';
import { Switch, FormControlLabel } from '@mui/material';
import { FieldWrapper } from './utils';

export const SwitchField: Field = ({ fieldConfig, inputProps: { value = false, onChange }, fieldState }) => {
  const { key, label } = fieldConfig;

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <FormControlLabel label={label} control={<Switch key={key} checked={value} onChange={onChange} />} />
    </FieldWrapper>
  );
};
