import { Option, Field } from '@tutim/types';
import { TextField as MuiTextField, MenuItem as MuiMenuItem } from '@mui/material';
import { InputLabelWithTooltip } from './utils';

export const SelectField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, label, isRequired, isDisabled, options = [], placeholder, tooltip, helperText } = fieldConfig;
  const { error = { message: '' } } = fieldState || {};

  const childOptions = options.map((option: Option) => (
    <MuiMenuItem disabled={option.disabled} key={option.value} value={option.value}>
      {option.label}
    </MuiMenuItem>
  ));

  return (
    <>
      <InputLabelWithTooltip label={label || key} tooltip={tooltip} />
      <MuiTextField
        value={value || ''}
        onChange={onChange}
        key={key}
        select
        fullWidth
        InputLabelProps={{ shrink: true }}
        InputProps={{
          placeholder: placeholder,
        }}
        SelectProps={{ native: false }}
        error={!!error?.message}
        helperText={error?.message || helperText}
        size="small"
        required={isRequired}
        disabled={isDisabled}
      >
        {childOptions}
      </MuiTextField>
    </>
  );
};
