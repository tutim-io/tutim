import { Field } from '@tutim/types';
import { TextField as MuiTextField, Autocomplete } from '@mui/material';

export const MultiTextField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  return (
    <Autocomplete
      onChange={(_e, value) => onChange(value)}
      value={value}
      multiple
      options={[]}
      freeSolo
      renderInput={(params) => (
        <MuiTextField
          {...params}
          label={isRequired ? `${label}*` : label}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
      fullWidth
      size="small"
      key={key}
      disabled={isDisabled}
    />
  );
};
