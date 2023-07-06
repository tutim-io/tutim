import React from 'react';
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
    <div className= 'inline-flex items-center' key={option.value}>
      <Label property={option.label} />
      
    </div>
  ));

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      
      <div className="flex">
        <label className="inline-flex items-center">
          <input type="radio" className="form-radio" name="radioGroup" value="option1" onChange={onChange}/>
          <span className="ml-2">Self-host</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input type="radio" className="form-radio" name="radioGroup" value="option2"/>
          <span className="ml-2">Cloud</span>
        </label>
        
      </div>
     
    
    </FieldWrapper>
  );
};



