import Button from '@mui/material/Button';
import { useWizard } from 'react-use-wizard';

const Footer = () => {
  const { previousStep, isLoading, activeStep, stepCount, isFirstStep } = useWizard();

  const handleBack = () => {
    previousStep();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleBack} disabled={isFirstStep}>
          Back
        </Button>
        <div>
          {activeStep !== stepCount - 1 && (
            <Button type="submit" form={`page${activeStep}`} color="primary" disabled={isLoading}>
              Next
            </Button>
          )}
          {activeStep === stepCount - 1 && (
            <Button color="primary" type="submit" form={`page${activeStep}`} disabled={isLoading}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Footer };
