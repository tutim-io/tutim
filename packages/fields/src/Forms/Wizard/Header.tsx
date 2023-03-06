import { useWizard } from 'react-use-wizard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export const Header = ({ config }) => {
  const { activeStep } = useWizard();

  return (
    <Stepper activeStep={activeStep}>
      {Object.values(config.meta.steps).map((step, index) => (
        <Step key={index}>
          <StepLabel>{(step as any).label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
