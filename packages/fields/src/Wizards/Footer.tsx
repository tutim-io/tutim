import Button from '@mui/material/Button';

const Footer = ({ step }) => {
  const { goBack, goNext, form, isFirstStep, isLastStep } = step;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={goBack} disabled={isFirstStep}>
          Back
        </Button>
        <div>
          {!isLastStep && (
            <Button onClick={goNext} disabled={!form.formState.isValid}>
              Next
            </Button>
          )}
          {isLastStep && (
            <Button color="primary" type="button" onClick={goNext} disabled={!form.formState.isValid}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Footer };
