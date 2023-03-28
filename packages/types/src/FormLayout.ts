export enum FieldsPerRow {
  One = 1,
  Two = 2,
  Three = 3,
}

export interface LayoutGroupConfigsGroup {
  key: string;
  fieldKeys: string[];
  title?: string;
  subGroups?: LayoutGroupConfigs;
  layout?: Pick<FormLayout, 'fieldsPerRow'>;
}

export interface LayoutGroupConfigs {
  groups?: LayoutGroupConfigsGroup[];
  layout?: Record<string, Pick<FormLayout, 'fieldsPerRow'>>;
}

export interface LayoutArrayConfig {
  [key: string]: FormLayout;
}

export interface FormLayout {
  style?: any;
  groupConfigs?: LayoutGroupConfigs;
  arrayConfigs?: { [arrayKey: string]: Pick<FormLayout, 'groupConfigs' | 'fieldsPerRow'> };
  fieldsPerRow?: FieldsPerRow;
  submit?: { label?: string; display?: boolean };
}
