import { FormConfig, OnSubmit, PartialFormConfig } from '@tutim/types';
import React from 'react';

export interface WizardProps {
  onSubmit: OnSubmit;
  formId?: string;
  config?: PartialFormConfig;
  initialValues?: Record<string, any>;
  // wizardContext?: any;
}

interface WizardContext {
  config: FormConfig;
  currentStep: number;
  goToStep: (stepIndex: number) => void;
  wizardValues: Record<string, any>;
  setWizardValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onStepSubmit: (stepValues: any, isFinalStep?: boolean) => void;
}

const wizardContext: WizardContext = {
  config: { fields: [] },
  currentStep: 0,
  goToStep: () => null,
  wizardValues: {},
  setWizardValues: () => null,
  onStepSubmit: () => null,
};

export const WizardContext = React.createContext<WizardContext>(wizardContext);
export const useWizardContext = (): WizardContext => React.useContext(WizardContext);

export const useWizard = ({ initialValues = {}, onSubmit, config }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [wizardValues, setWizardValues] = React.useState<any>(initialValues);
  const stepCount = config.wizard?.steps?.length || 0;

  const onStepSubmit = (stepValues: any, isFinalStep = false) => {
    setWizardValues((prevWizardValues) => {
      const values = { ...prevWizardValues, ...stepValues };
      if (isFinalStep) {
        const webhookEndpoint = config.logic?.webhook?.endpoint;
        const body = { data: values, schema: config };
        onSubmit(body);
        if (webhookEndpoint) {
          callWebhook(webhookEndpoint, body);
        }
      }
      return values;
    });
  };

  const goToStep = (nextStepIndex: number) => {
    if (nextStepIndex < 0 || nextStepIndex > stepCount) return;
    const isFinalStep = stepCount === nextStepIndex;
    if (!isFinalStep) setCurrentStep(nextStepIndex);
  };

  return {
    config,
    stepCount,
    currentStep,
    wizardValues,
    goToStep,
    setWizardValues,
    onStepSubmit,
  };
};

export const WizardProvider = ({ children, ...rest }: WizardProps & { children: React.ReactNode }) => {
  const wizard = useWizard(rest as any); //TODO: fix this;

  return <WizardContext.Provider value={wizard}>{children}</WizardContext.Provider>;
};

const callWebhook = async (endpoint: string, body: any) => {
  return await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
};
