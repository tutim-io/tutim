import { FieldComponents } from './Field';
import { FormConfig } from './FormConfig';

export interface TutimOptions {
  forms: Record<string, FormConfig>;
  clientId?: string;
}

export interface TutimOptionsProviderValue {
  options: TutimOptions;
  setOptions: (config: TutimOptions) => void;
}

export interface TutimProviderProps {
  fieldComponents?: FieldComponents;
  options?: Partial<TutimOptions>;
  children: React.ReactNode;
}
