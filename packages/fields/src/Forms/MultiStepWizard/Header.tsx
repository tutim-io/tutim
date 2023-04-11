import { useWizard } from 'react-use-wizard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { PartialFormConfig } from '@tutim/types';

export const Header = ({ config }: { config: PartialFormConfig }) => {
  const { activeStep, goToStep } = useWizard();
  if (!config.wizard) return null;
  const isVertical = config.wizard.orientation === 'vertical';
  const styling = isVertical
    ? { overflow: 'auto', height: '100%', minWidth: '100px', maxWidth: '250px', padding: '10px' }
    : { overflow: 'auto', width: '100%', height: '80px', padding: '10px' };

  return (
    <Stepper nonLinear activeStep={activeStep} orientation={config.wizard.orientation} id="wizard-header" sx={styling}>
      {Object.values(config.wizard.steps).map(({ label }, index) => (
        <Step key={label}>
          <StepButton
            color="inherit"
            style={{ maxWidth: '300px', textOverflow: 'clip' }}
            onClick={() => goToStep(index)}
          >
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
};
