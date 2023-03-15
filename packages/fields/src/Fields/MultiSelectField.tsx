import { Field } from '@tutim/types';
import { TextField, Autocomplete } from '@mui/material';
import { FieldWrapper } from './utils';

export const MultiSelectField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { isDisabled, options = [] } = fieldConfig;

  const handleChange = (event, newValue) => {
    onChange(newValue.map((option) => option.value));
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Autocomplete
        multiple
        options={options}
        value={options.filter((option) => value.includes(option.value))}
        onChange={handleChange}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder="Select options" InputLabelProps={{ shrink: true }} />
        )}
        fullWidth
        size="small"
        disabled={isDisabled}
      />
    </FieldWrapper>
  );
};
