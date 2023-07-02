import React from 'react';
import { Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';

export const DateField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, placeholder } = fieldConfig;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>

      <div className="mb-4">
        <input
          value={value || ''}
          onChange={onInputChange}
          type="date"
          className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          key={key}
          required={isRequired}
          disabled={isDisabled}
        />
      </div>
      
    </FieldWrapper>
  );
};
