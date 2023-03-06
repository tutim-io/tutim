import { Wizard as Wiz } from 'react-use-wizard';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { FormStep } from './FormStep';
import { Typography } from '@mui/material';

export const Wizard = ({ onSubmit, config }) => {
  const [wizardValues, setWizardValues] = React.useState({});
  const steps = Object.keys(config.meta.steps);
  const title = config.meta.title && <Typography variant="h5">{config.meta.title}</Typography>;

  const onWizardSubmit = (stepValues: Record<string, any>, isLastStep: boolean) => {
    const values = { ...wizardValues, ...stepValues };
    if (isLastStep) onSubmit({ data: values, schema: config });
    else setWizardValues(values);
  };

  return (
    <div style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      {title}
      <Wiz footer={<Footer />} header={<Header config={config} />}>
        {steps.map((step) => (
          <FormStep key={step} config={config} handleSubmit={onWizardSubmit} />
        ))}
      </Wiz>
    </div>
  );
};
