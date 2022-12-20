import React from 'react';
import { FieldsByKey, FieldConfig } from '@tutim/types';

const isReactNode = (value: any): value is React.ReactNode => {
  return typeof value === 'object' && value !== null && value.$$typeof;
};

export const getFieldsFromMap = (fieldsByKey: FieldsByKey): React.ReactNode[] => {
  const fields = Object.values(fieldsByKey).reduce<React.ReactNode[]>((acc, value) => {
    if (isReactNode(value)) acc.push(value);
    else acc.push(...getFieldsFromMap(value));
    return acc;
  }, [] as React.ReactNode[]);
  return fields;
};

export const getChildConfigs = (parentConfig: FieldConfig): FieldConfig[] => {
  if (!parentConfig.children) throw new Error('Not children');

  const childConfigs = Object.values<FieldConfig>(parentConfig.children.fields).map(({ key, ...fieldConfig }) => {
    return { ...fieldConfig, key: `${parentConfig.key}.${key}` };
  });

  return childConfigs;
};

const isNumberString = (value: string | number): value is number => {
  return !isNaN(Number(value));
};

export const getFieldRelativeKeys = (key: string): string[] => {
  const keys = key.split('.');
  const relativeKeys = keys.map((key) => (isNumberString(key) ? '$' : key));
  return relativeKeys;
};
