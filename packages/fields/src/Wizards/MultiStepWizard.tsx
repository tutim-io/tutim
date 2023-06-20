import { Header } from './Header';
import { WizardStep } from './WizardStep';
import { Typography } from '@mui/material';
import { OnSubmit, PartialFormConfig } from '@tutim/types';
import { WizardProvider, useWizard } from '@tutim/headless';

interface WizardProps {
  onSubmit: OnSubmit;
  config: PartialFormConfig;
  initialValues?: Record<string, any>;
  wizardContext?: any;
}

export const MuiTutimWizard = ({ onSubmit, config, initialValues = {}, wizardContext }: WizardProps) => {
  if (!config.wizard) throw new Error('Wizard config is missing');

  const wizardContextMerged = useWizard({ initialValues, onSubmit, config, wizardContext });
  const title = config.meta?.title && <Typography variant="h5">{config.meta.title}</Typography>;
  const isVertical = config.wizard.orientation === 'vertical';

  return (
    <div id="wizard" style={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      {title}
      <div style={isVertical ? { gap: '30px', display: 'flex', flexDirection: 'row' } : {}}>
        <WizardProvider wizardContext={wizardContextMerged}>
          <Header config={config} />
          <WizardStep />
        </WizardProvider>
      </div>
    </div>
  );
};
