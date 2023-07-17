import { Option, Field } from '@tutim/types';
import { TextField as MuiTextField, MenuItem as MuiMenuItem } from '@mui/material';
import { FieldWrapper } from './utils';

export const SelectField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, options = [], placeholder } = fieldConfig;
             
  const childOptions = options.map((option: Option) => (
    <MuiMenuItem disabled={option.disabled} key={option.value} value={option.value}>
      {option.label}
    </MuiMenuItem>
  ));

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <MuiTextField
        select
        onChange={onChange}
        value={value || ''}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          placeholder: placeholder,
        }}
        SelectProps={{ native: false }}
        fullWidth
        size="small"
        key={key}
        required={isRequired}
        disabled={isDisabled}
      >
        {childOptions}
      </MuiTextField>
    </FieldWrapper>
  );
};
