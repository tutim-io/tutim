import React from 'react';
import { WizardProvider, useWizard, useWizardContext } from '@tutim/headless';

export const HeadlessWizard = (): JSX.Element => {
  const wizard = useWizard();
  React.useEffect(() => {
    setTimeout(() => {
      wizard.goToStep(3);
    }, 1000);
  }, []);
  return (
    <div>
      <WizardProvider>
        <ContextedWizard />
      </WizardProvider>
      <WizardProvider>
        <ContextedWizard />
      </WizardProvider>
    </div>
  );

  return (
    <div>
      <div>
        {wizard.currentStep}
        <Step />
      </div>
    </div>
  );
};

const Step = () => {
  return <p>my step is</p>;
};

const ContextedWizard = () => {
  const wizard = useWizardContext();
  React.useEffect(() => {
    setTimeout(() => {
      wizard.goToStep(Math.random() * 10);
    }, 1000);
  }, []);

  return (
    <div>
      <ContextedStep />
      <div>hey</div>
    </div>
  );
};

const ContextedStep = () => {
  const context = useWizardContext();
  return <p>my step is {context.currentStep}</p>;
};
