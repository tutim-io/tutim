import { Option, Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '../../components/ui/select';

export const SelectField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  
  const { key, isRequired, isDisabled, options = [] } = fieldConfig;


  const childOptions = options.map((option: Option) => (
     <SelectItem value={ String(option.value)} key={option.value} disabled={option.disabled}>{option.label}</SelectItem>
  ));


  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <div  className="mt-2" > 
        <Select key={key} required ={isRequired} disabled={isDisabled} onValueChange ={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value || ''} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {childOptions}
        </SelectGroup>
      </SelectContent>
    </Select></div>  
    </FieldWrapper>
  );
};
