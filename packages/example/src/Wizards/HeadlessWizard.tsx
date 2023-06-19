import React from 'react';
import { WizardProvider, useStep, useWizard, useWizardContext } from '@tutim/headless';
import { FormConfig } from '@tutim/types';

const config: FormConfig = {
  logic: {
    webhook: {
      endpoint: 'lala',
    },
  },
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      isRequired: true,
      tooltip: 'A tooltip',
      helperText: 'A helper text',
      placeholder: 'A placeholder',
    },
    {
      key: 'lastName',
      isRequired: true,
      label: 'Last Name',
      type: 'text',
    },
    { key: 'email', isRequired: true, label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'number' },
    { key: 'additional', label: 'additional', type: 'text', isRequired: true },
  ],
  wizard: {
    steps: [
      {
        label: 'Basic',
        fields: ['firstName', 'lastName'],
      },
      {
        label: 'Contact',
        fields: ['email', 'phone'],
      },
      {
        label: 'Additional',
        fields: ['additional'],
      },
    ],
    orientation: 'vertical',
  },
  meta: {
    title: 'Basic Wizard',
  },
};

export const HeadlessWizard = (): JSX.Element => {
  return (
    <div>
      <WizardProvider config={config}>
        <ContextedWizard />
      </WizardProvider>
      {/* <WizardProvider config={config}>
        <ContextedWizard />
      </WizardProvider> */}
    </div>
  );
};

const ContextedWizard = () => {
  const wizard = useWizardContext();
  React.useEffect(() => {
    setTimeout(() => {
      wizard.goToStep(Math.round(Math.random() * 3));
    }, 1000);
  }, []);

  return (
    <div>
      <ContextedStep />
      <div>hey</div>
    </div>
  );
};

const ContextedStep = () => {
  const context = useWizardContext();
  const step = useStep();
  return (
    <div>
      <p>my step is {context.currentStep}</p>
      {step.form.fields}
      <button onClick={step.goBack}>Go Back</button>
      <button onClick={step.goNext}>Go Next</button>
    </div>
  );
};
