import { FormLayout } from '@tutim/types';
import React from 'react';
import { FormGrid } from './FormGrid';

interface FieldGroupProps {
  children: React.ReactNode[];
  layout?: FormLayout;
}

export const FieldGroup = ({ children, layout = {} }: FieldGroupProps) => {
  return <FormGrid fieldsPerRow={layout.fieldsPerRow}>{children}</FormGrid>;
};
