import { PartialFormConfig } from '@tutim/types';
import { useWizardContext } from '@tutim/headless';
import { Check } from "lucide-react"

export const Header = ({ config }: { config: PartialFormConfig }) => {
  const { activeStep, goToStep } = useWizardContext();
  if (!config.wizard) return null;
  const isVertical = config.wizard.orientation === 'vertical';

  return (

    <ol className={`${isVertical ? 'relative border-l' : 'flex space-x-6'} text-gray-500 border-gray-200`}>
      {Object.values(config.wizard.steps).map(({ label }, index) => (
        <li className={`${isVertical ? 'mb-10 ml-6' : 'flex flex-col items-center'}`}>
          <span onClick={() => goToStep(index)} >
            {
              activeStep > index ?
                <div className={`${isVertical ? 'absolute' : 'flex'} flex items-center justify-center w-8 h-8 bg-black rounded-full cursor-pointer -left-4 ring-4 ring-white`}>
                  <Check className="w-5 h-5" color='white'/> 
                </div>
                :
                <div className={`${isVertical ? 'absolute' : null} flex items-center justify-center w-8 h-8 text-white bg-gray-400 rounded-full cursor-pointer -left-4 ring-4 ring-white`}>
                  {index + 1}
                </div>
            }
          </span>
          <h3 className={`pt-1 ${activeStep === index ? 'text-black' : null}`}>{label}</h3>
        </li>
      ))}
    </ol>

  );
};
