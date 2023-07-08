
import React, { useState } from 'react';
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
 

import { Option, Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';


export const RadioField: Field = (props) => {
  const { fieldConfig, inputProps, fieldState } = props;
  const { value, onChange } = inputProps;
  const { options = [], custom } = fieldConfig;

  const isHorizontal = custom?.orientation === 'vertical' ? false : true;

  const childOptions = options.map((option: Option) => (
    <div className="flex items-center" key={option.value}>
      <input 
        type='radio' 
        value={option.value}
        checked={value === option.value}
        onChange={onChange}
        className="form-radio mr-2"/>
      <Label >{option.label}</Label>
    </div>
  ));

  return (
    <div className="space-x-2">
      <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState} >
        <RadioGroup value={value} onChange={onChange} className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
          {childOptions}
        </RadioGroup>
      </FieldWrapper>
    </div>
  );
};