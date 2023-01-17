import React from 'react';
import { Form } from '@tutim/fields';
import configBase from './basic.json';
import { Field } from '@tutim/types';

const CustomField: Field = ({ inputProps }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 2);
  return (
    <button type="button" onClick={onClick}>
      Click Me: {value}
    </button>
  );
};

const customField = {
  key: 'clicker',
  label: 'Click Me',
  type: 'custom',
  defaultValue: 0,
  Field: CustomField,
};

const config = { ...configBase, fields: [...configBase.fields, customField] };

const initialValues = {
  firstName: 'sami',
  agree: true,
  enable: true,
  hosting: 'cloud',
};

export const TutimForm = (): JSX.Element => {
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return <Form onSubmit={onSubmit} config={config} initialValues={initialValues} />;
};
