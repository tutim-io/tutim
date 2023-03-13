import React from 'react';
import { TutimWizard } from '@tutim/fields';

export const SchemaServe = (): JSX.Element => {
  return <TutimWizard onSubmit={console.log} formId={'44'} />;
};
