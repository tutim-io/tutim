import { useWizard } from 'react-use-wizard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { PartialFormConfig } from '@tutim/types';

export const Header = ({ config }: { config: PartialFormConfig }) => {
  const { activeStep, goToStep } = useWizard();
  if (!config.wizard) return null;

  return (
    <Stepper nonLinear activeStep={activeStep}>
      {Object.values(config.wizard.steps).map(({ label }, index) => (
        <Step key={label}>
          <StepButton color="inherit" onClick={() => goToStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};
