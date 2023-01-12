import React from 'react';
import { Form } from '@tutim/fields';

const config = {
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      inputType: 'text',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      inputType: 'text',
    },
  ],
};

export const SchemaServe = (): JSX.Element => {
  return <Form onSubmit={console.log} formId={'1'} />;
};
