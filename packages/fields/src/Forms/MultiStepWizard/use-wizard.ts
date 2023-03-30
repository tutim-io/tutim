import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface WizardState {
  wizardValues: Record<string, any>;
  setWizardValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const wizardContext: WizardState = { wizardValues: {}, setWizardValues: (() => null) as any };
export const WizardContext = React.createContext<WizardState>(wizardContext);
export const useWizardState = (): WizardState => React.useContext(WizardContext);

export type WizardCurrentForm = UseFormReturn;

const currentForm: WizardCurrentForm = {} as any;
export const WizardCurrentFormContext = React.createContext<WizardCurrentForm>(currentForm);
export const useWizardCurrentForm = (): WizardCurrentForm => React.useContext(WizardCurrentFormContext);
