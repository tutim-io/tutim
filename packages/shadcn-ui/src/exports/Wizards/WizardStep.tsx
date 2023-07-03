import { useStep, useWizardContext } from '@tutim/headless';
import { Footer } from './Footer';
import { FormView } from '../Forms';

export const WizardStep = () => {
  const context = useWizardContext();
  const step = useStep();
  const stepKey = `page${context.activeStep}`;

  return (
    <div style={{ padding: '0px 10px', width: 'calc(100% - 24px)' }}>
      <FormView formId={stepKey} form={step.form} onSubmit={() => null} />
      <Footer step={step} />
    </div>
  );
};
