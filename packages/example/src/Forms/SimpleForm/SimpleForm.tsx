import React from 'react';
import { TutimWizard } from '@tutim/fields';

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
  return <TutimWizard onSubmit={console.log} config={config} />;
};
