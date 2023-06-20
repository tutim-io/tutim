import { Wizard as Wiz } from 'react-use-wizard';
import { Header } from './Header';
import { WizardStep } from './WizardStep';
import { Typography } from '@mui/material';
import { OnSubmit, PartialFormConfig } from '@tutim/types';
import { WizardContext, WizardProvider, useWizard } from '@tutim/headless';

interface WizardProps {
  onSubmit: OnSubmit;
  config: PartialFormConfig;
  initialValues?: Record<string, any>;
  wizardContext?: any;
}

export const MuiTutimWizard = ({ onSubmit, config, initialValues = {} }: WizardProps) => {
  if (!config.wizard) throw new Error('Wizard config is missing');

  const wizardContext = useWizard({ initialValues, onSubmit, config });
  const title = config.meta?.title && <Typography variant="h5">{config.meta.title}</Typography>;
  const isVertical = config.wizard.orientation === 'vertical';

  return (
    <div id="wizard" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      {title}
      <div style={isVertical ? { gap: '30px', display: 'flex', flexDirection: 'row' } : {}}>
        <WizardProvider wizardContext={wizardContext}>
          <Header config={config} />
          <WizardStep />
        </WizardProvider>
      </div>
    </div>
  );
};

export const ControlledMuiWizard = ({ config, wizardContext }: WizardProps) => {
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
