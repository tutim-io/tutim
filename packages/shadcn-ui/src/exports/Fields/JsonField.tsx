import React from 'react';
import { Field } from '@tutim/types';
import ReactJson from 'react-json-view';
import { FieldWrapper } from './FieldWrapper';

export const JsonField: Field = ({ fieldConfig, inputProps: { value, onChange }, fieldState }) => {
  const onEdit = onChange ? ({ updated_src }: any) => onChange(updated_src) : undefined;

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <ReactJson src={value || {}} onAdd={onEdit} onEdit={onEdit} onDelete={onEdit} />
    </FieldWrapper>
  );
};
