
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
    <div className='item' key={option.value} >
      <RadioGroupItem value={option.value.toString()} disabled={option.disabled}/>
      <Label htmlFor={option.label}>{option.label}</Label>  
      
    </div>
  ));

  return (
    <div className="space-x-2">
      <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState} >
        <RadioGroup value={value} onValueChange={onChange} orientation={custom?.orientation}>
          <div className={`container mx-auto ${isHorizontal ? 'center' : 'flex-start'} ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
            {childOptions}
          </div>
          
        </RadioGroup>
      </FieldWrapper>
    </div>
  );
};