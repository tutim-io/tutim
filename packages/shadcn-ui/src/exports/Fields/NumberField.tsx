import React from 'react';
import { Field } from '@tutim/types';
import { Input } from '../../components/ui/input';
import { FieldWrapper } from './FieldWrapper';

export const NumberField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, placeholder } = fieldConfig;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.valueAsNumber);
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Input
        onChange={onInputChange}
        type="number"
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
