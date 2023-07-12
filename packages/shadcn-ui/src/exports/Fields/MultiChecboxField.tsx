import React from 'react';
import { Field } from '@tutim/types';
import { Checkbox } from '../../components';
import { FieldWrapper } from './FieldWrapper';

const handleChange = (optionValue, currentValue, onChange) => {
  const newValues = currentValue.includes(optionValue)
    ? currentValue.filter((value) => value !== optionValue)
    : [...currentValue, optionValue];

  onChange(newValues);
};

export const MultiCheckboxField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { options = [], isDisabled, custom } = fieldConfig;

  const isHorizontal = custom?.orientation === 'vertical' ? false : true;

  const childOptions = options.map((option) => (
    <div key={option.value} className="flex justify-start items-center px-2">
      <Checkbox
        checked={value.includes(option.value)}
        onClick={() => handleChange(option.value, value, onChange)}
        disabled={isDisabled || option.disabled}
        className="m-1 border-black"
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {option.label}
      </label>
    </div>
  ));

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <div
        className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} ${isHorizontal ? 'items-center' : 'items-start'}`}
      >
        {childOptions}
      </div>
    </FieldWrapper>
  );
};
