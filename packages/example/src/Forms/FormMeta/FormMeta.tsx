import React from 'react';
import { FormConfig } from '@tutim/types';
import { Form } from '@tutim/fields';

const config: FormConfig = {
  meta: { title: 'My Form' },

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

export const FormMeta = (): JSX.Element => {
  return <Form onSubmit={console.log} config={config} />;
};
