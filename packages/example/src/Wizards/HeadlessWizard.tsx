import React from 'react';
import { useWizard } from '@tutim/headless';

export const HeadlessWizard = (): JSX.Element => {
  const wizard = useWizard();
  React.useEffect(() => {
    setTimeout(() => {
      wizard.setStep(3);
    }, 1000);
  }, []);
  return (
    <div>
      <div>
        {wizard.step}
        <Step />
      </div>
    </div>
  );
};

const Step = () => {
  return <p>my step is</p>;
};
