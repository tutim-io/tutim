import Button from '@mui/material/Button';
import { useWizard } from 'react-use-wizard';

const Footer = ({ onFinalSubmit }) => {
  const { previousStep, nextStep, isLoading, activeStep, stepCount, isFirstStep } = useWizard();

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
          {activeStep !== stepCount - 1 && <Button onClick={nextStep}>Next</Button>}
          {activeStep === stepCount - 1 && (
            <Button color="primary" type="button" onClick={onFinalSubmit} disabled={isLoading}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Footer };
