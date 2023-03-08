import { Wizard as Wiz } from 'react-use-wizard';
import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { WizardStep } from './WizardStep';
import { Typography } from '@mui/material';
import { OnSubmit, PartialFormConfig } from '@tutim/types';

interface WizardProps {
  onSubmit: OnSubmit;
  config: PartialFormConfig;
  initialValues?: Record<string, any>;
}

export const Wizard = ({ onSubmit, config, initialValues = {} }: WizardProps) => {
  if (!config.wizard) throw new Error('Wizard config is missing');
  const [wizardValues, setWizardValues] = React.useState(initialValues);
  const title = config.meta?.title && <Typography variant="h5">{config.meta.title}</Typography>;
  const isVertical = config.wizard.orientation === 'vertical';

  const onWizardSubmit = (stepValues: Record<string, any>, isLastStep: boolean) => {
    const values = { ...wizardValues, ...stepValues };
    if (isLastStep) onSubmit({ data: values, schema: config });
    else setWizardValues(values);
  };

  return (
    <div id="wizard" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      {title}
      <div style={isVertical ? { gap: '30px', display: 'flex', flexDirection: 'row' } : {}}>
        <Wiz header={<Header config={config} />}>
          {config.wizard.steps.map((step) => (
            <WizardStep key={step.label} config={config} wizardValues={wizardValues} handleSubmit={onWizardSubmit} />
          ))}
        </Wiz>
      </div>
    </div>
  );
};
