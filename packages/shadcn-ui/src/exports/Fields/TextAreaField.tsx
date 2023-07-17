import React from 'react';
import { Field } from '@tutim/types';
//import { TextField as MuiTextField } from '@mui/material';
import { FieldWrapper } from './FieldWrapper';
import { Textarea } from "../../components/ui/textarea"



export const TextAreaField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, placeholder } = fieldConfig;

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    onChange(value);
  };


  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      {/* <MuiTextField
        multiline
        onChange={onInputChange}
        value={value || ''}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          placeholder: placeholder,
        }}
        rows={4}
        fullWidth
        key={key}
        required={isRequired}
        disabled={isDisabled}
      /> */}
      <Textarea placeholder ={ placeholder} disabled={isDisabled}  required={isRequired} 
      onChange={e=>onInputChange(e)}    value={value || ''} rows={4} key={key}/>
    </FieldWrapper>
  );
};
