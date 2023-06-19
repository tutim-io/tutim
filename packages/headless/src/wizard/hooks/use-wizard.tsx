import React from 'react';

interface WizardState {
  currentStep: number;
  goToStep: React.Dispatch<React.SetStateAction<number>>;
}

const wizardContext: WizardState = {
  currentStep: 0,
  goToStep: () => null,
};

export const WizardContext = React.createContext<WizardState>(wizardContext);
export const useWizardContext = (): WizardState => React.useContext(WizardContext);

export const useWizard = () => {
  const [currentStep, goToStep] = React.useState(0);

  return {
    currentStep,
    goToStep,
  };
};

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
  const wizard = useWizard();

  return <WizardContext.Provider value={wizard}>{children}</WizardContext.Provider>;
};
