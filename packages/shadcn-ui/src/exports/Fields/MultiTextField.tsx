import { useEffect, useState } from 'react';
import { Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';
import { Button, Input } from '../../components';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components';
import { X } from 'lucide-react';

const style = {
  disabled: 'pointer-events-none opacity-60 ',
};

const ClearBtn: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={onClick}
            variant="ghost"
            size="default"
            className="bg-transparent text-gray-400 border-none outline-none p-3 hover:text-gray-600 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const OptionBtn: React.FC<{ option: string; onClick: (key: string) => void }> = ({ option, onClick }) => {
  const handleClick = () => {
    onClick(option);
  };
  return (
    <Button variant="outline" className="bg-gray-400 text-black hover:bg-gray-400 rounded-full">
      {option}
      <X onClick={handleClick} className="ml-2 h-4 w-4 p-1 bg-gray-800 hover:bg-gray-600 rounded-full text-white" />
    </Button>
  );
};

export const MultiTextField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { isDisabled } = fieldConfig;
  const [currValue, setCurrValue] = useState<string>('');

  const clearOptions = (optionKey?: string | undefined) => {
    if (!optionKey) onChange(undefined);
    else onChange(value.filter((option) => option !== optionKey));
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Enter' && currValue !== '') {
        console.log('Enter', value, currValue);
        onChange([...value, currValue]);
        setCurrValue('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currValue]);

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <div
        tabIndex={0}
        className={`relative w-full min-h-6 border flex items-center gap-2 p-2 rounded-md outline-none focus:border-blue-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-50
        ${isDisabled && style.disabled} text-gray-400 
        `}
      >
        <span className="flex-grow flex gap-2 flex-wrap items-center">
          {value[0] ? (
            value.map((val) => <OptionBtn key={val} option={val} onClick={() => clearOptions(val)} />)
          ) : (
            <></>
          )}
          <Input
            type="text"
            className="w-1/2 border-none border-white outline-none outline-white ring-0"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.stopPropagation();
              setCurrValue(e.target.value);
            }}
            value={currValue}
          />
        </span>

        {value.length !== 0 && <ClearBtn onClick={() => clearOptions()} />}
      </div>
    </FieldWrapper>
  );
};
