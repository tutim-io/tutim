import React from 'react';
import { Button } from "../../components/ui/button"
import { FormLayout } from '@tutim/types';

export const SubmitButton = ({ label = 'Submit', display = true }: FormLayout['submit'] = {}) => {
  if (!display) return null;
  return (
    <div key="submit" className='flex justify-end'>
      <Button type="submit" variant="default">
        {label}
      </Button>
    </div>
  );
};
