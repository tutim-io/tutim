import React from 'react';
import { Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';
import { Input } from "../../components/ui/input"

import { FieldCollapse } from '../Forms/Collapse';

export const TextField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const { key, isRequired, isDisabled, placeholder } = fieldConfig;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Input
        onChange={onInputChange}
        value={value || ''}
        placeholder={placeholder}
        key={key}
        required={isRequired}
        disabled={isDisabled}
        className='mt-2 mb-1'
      />

      <FieldCollapse
        key={1}
        error={'error'}
        title={
          <>
            <span style={{ fontSize: '20px' }}>testttt</span>
            
          </>
        }
      />
    </FieldWrapper>
  );
};
