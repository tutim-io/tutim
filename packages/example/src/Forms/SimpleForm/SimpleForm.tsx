import React from 'react';
import { Form } from '@tutim/fields';

const config = {
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'text',
    },
  ],
};

export const SimpleForm = (): JSX.Element => {
  return <Form onSubmit={console.log} config={config} />;
};
