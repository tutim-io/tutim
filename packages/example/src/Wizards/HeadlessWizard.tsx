import React from 'react';
import { WizardProvider, useStep, useWizard, useWizardContext } from '@tutim/headless';
import { FormConfig } from '@tutim/types';

const config: FormConfig = {
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
  const wizardContext = useWizard({ initialValues: { email: 'one' }, onSubmit: console.log, config });

  return (
    <WizardProvider wizardContext={wizardContext}>
      <ContextedWizard />
    </WizardProvider>
  );
};

const ContextedWizard = () => {
  const wizard = useWizardContext();

  return <ContextedStep key={`step${wizard.activeStep}`} />;
};

const ContextedStep = () => {
  const context = useWizardContext();
  const step = useStep();
  return (
    <div>
      <p>my step is {context.activeStep}</p>
      {step.form.fields}
      <button onClick={step.goBack} disabled={!step.form.formState.isValid || step.isFirstStep}>
        Go Back
      </button>
      <button onClick={step.goNext} disabled={!step.form.formState.isValid}>
        {step.isLastStep ? 'Submit' : 'Go Next'}
      </button>
    </div>
  );
};
