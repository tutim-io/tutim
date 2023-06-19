import React from 'react';

interface WizardState {
  step: number;
}

const wizardContext: WizardState = {
  step: 0,
};
export const WizardContext = React.createContext<WizardState>(wizardContext);
export const useWizardState = (): WizardState => React.useContext(WizardContext);

export const useWizard = () => {
  const [step, setStep] = React.useState(0);

  return {
    step,
    setStep,
  };
};
