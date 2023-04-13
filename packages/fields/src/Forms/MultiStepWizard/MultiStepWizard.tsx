import { Wizard as Wiz } from 'react-use-wizard';
import React from 'react';
import { Header } from './Header';
import { WizardStep } from './WizardStep';
import { Typography } from '@mui/material';
import { OnSubmit, PartialFormConfig } from '@tutim/types';
import { WizardContext } from './use-wizard';

interface WizardProps {
  onSubmit: OnSubmit;
  config: PartialFormConfig;
  initialValues?: Record<string, any>;
  wizardContext?: any;
}

export const MultiStepWizard = ({ onSubmit, config, initialValues = {} }: WizardProps) => {
  if (!config.wizard) throw new Error('Wizard config is missing');
  const { wizardValues, setWizardValues, handleSubmit, currentForm, setCurrentForm } = useTutimWizard({
    initialValues,
    onSubmit,
    config,
  });
  const title = config.meta?.title && <Typography variant="h5">{config.meta.title}</Typography>;
  const isVertical = config.wizard.orientation === 'vertical';

  return (
    <div id="wizard" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      {title}
      <div style={isVertical ? { gap: '30px', display: 'flex', flexDirection: 'row' } : {}}>
        <WizardContext.Provider value={{ wizardValues, setWizardValues, currentForm, setCurrentForm }}>
          <Wiz header={<Header config={config} />}>
            {config.wizard.steps.map((step) => (
              <WizardStep key={step.label} config={config} handleSubmit={handleSubmit} />
            ))}
          </Wiz>
        </WizardContext.Provider>
      </div>
    </div>
  );
};

export const ControlledWizard = ({ config, wizardContext }: WizardProps) => {
  if (!config.wizard) throw new Error('Wizard config is missing');
  const { wizardValues, setWizardValues, handleSubmit, currentForm, setCurrentForm } = wizardContext;
  const title = config.meta?.title && <Typography variant="h5">{config.meta.title}</Typography>;
  const isVertical = config.wizard.orientation === 'vertical';

  return (
    <div id="wizard" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      {title}
      <div style={isVertical ? { gap: '30px', display: 'flex', flexDirection: 'row' } : {}}>
        <WizardContext.Provider value={{ wizardValues, setWizardValues, currentForm, setCurrentForm }}>
          <Wiz header={<Header config={config} />}>
            {config.wizard.steps.map((step) => (
              <WizardStep key={step.label} config={config} handleSubmit={handleSubmit} />
            ))}
          </Wiz>
        </WizardContext.Provider>
      </div>
    </div>
  );
};

export const useTutimWizard = ({ initialValues = {}, onSubmit, config }) => {
  const [wizardValues, setWizardValues] = React.useState(initialValues);
  const [currentForm, setCurrentForm] = React.useState<any>({});

  const handleSubmit = (stepValues: Record<string, any>, isFinalSubmit: boolean) => {
    setWizardValues((prevWizardValues) => {
      const values = { ...prevWizardValues, ...stepValues };
      if (isFinalSubmit) {
        onSubmit({ data: values, schema: config });
      }
      return values;
    });
  };

  const submitWizard = () => {
    const onFinalSubmit: OnSubmit = ({ data }) => {
      handleSubmit(data, true);
    };
    if (currentForm) {
      currentForm.nativeSubmit(onFinalSubmit)();
    }
  };

  return {
    wizardValues,
    setWizardValues,
    handleSubmit,
    currentForm,
    setCurrentForm,
    submitWizard,
  };
};
