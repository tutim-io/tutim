import React from 'react';
import { UseFormInit } from '@tutim/types';

export const getUseFormInit = (setValue: (key: string, value: any) => void): UseFormInit => {
  return (getData: () => Promise<Record<string, any> | undefined>): boolean => {
    const [isInitializing, setIsInit] = React.useState(false);
    const setInitialData = () => {
      getData().then((data) => {
        setIsInit(true);
        if (!data) return;
        Object.entries(data).forEach(([key, value]) => setValue(key, value));
      });
    };
    React.useEffect(setInitialData, []);

    return isInitializing;
  };
};
