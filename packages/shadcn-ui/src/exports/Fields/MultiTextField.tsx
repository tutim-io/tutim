import { Field } from '@tutim/types';
import { TextField as MuiTextField, Autocomplete } from '@mui/material';
import { FieldWrapper } from './FieldWrapper';

export const MultiTextField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { isDisabled } = fieldConfig;

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Autocomplete
        onChange={(_e, value) => onChange(value)}
        value={value}
        multiple
        options={[]}
        freeSolo
        renderInput={(params) => <MuiTextField {...params} InputLabelProps={{ shrink: true }} />}
        fullWidth
        size="small"
        disabled={isDisabled}
      />
    </FieldWrapper>
  );
};
