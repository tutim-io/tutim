import React from 'react';
import { Field } from '@tutim/types';
import { Input } from '../../components/ui/input';
import { FieldWrapper } from './FieldWrapper';

export const PasswordField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, placeholder } = fieldConfig;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Input
        type="password"
        onChange={onInputChange}
        value={value || ''}
        placeholder={placeholder}
        key={key}
        required={isRequired}
        disabled={isDisabled}
        className="w-full mt-2 mb-1"
      />
    </FieldWrapper>
  );
};
