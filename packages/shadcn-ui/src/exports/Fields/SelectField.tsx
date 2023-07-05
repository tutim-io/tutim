import { Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';


export const SelectField: Field = ({ fieldConfig, inputProps: fieldState }) => { 
  fieldConfig;
  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Editor" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Administrator">Administrator</SelectItem>
    <SelectItem value="Viewer" disabled>Viewer</SelectItem>
    <SelectItem value="Editor">Editor</SelectItem>
  </SelectContent>
</Select>
    </FieldWrapper>
  );
};
