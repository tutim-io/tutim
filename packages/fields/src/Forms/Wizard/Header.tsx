import { useWizard } from 'react-use-wizard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FormConfig } from '@tutim/types';

export const Header = ({ config }: { config: FormConfig }) => {
  const { activeStep } = useWizard();
  if (!config.wizard) return null;

  return (
    <Stepper activeStep={activeStep}>
      {Object.values(config.wizard.steps).map((step, index) => (
        <Step key={index}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
