import { Field } from '@tutim/types';
import { TextField, Autocomplete } from '@mui/material';

export const MultiSelectField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled, options = [] } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const handleChange = (event, newValue) => {
    onChange(newValue.map((option) => option.value));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={options.filter((option) => value.includes(option.value))}
      onChange={handleChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Select options"
          label={isRequired ? `${label}*` : label}
          error={!!error?.message}
          helperText={error?.message}
          InputLabelProps={{ shrink: true }}
        />
      )}
      fullWidth
      size="small"
      key={key}
      disabled={isDisabled}
    />
  );
};
