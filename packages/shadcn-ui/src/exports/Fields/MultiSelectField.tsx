import { useState } from 'react';
import { Field } from '@tutim/types';
import { FieldWrapper } from './FieldWrapper';
import { Button, Input } from '../../components';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components';
import { X, ChevronDown } from 'lucide-react';

enum Title {
  Clear = 'clear',
  Open = 'open',
}

const style = {
  disabled: 'pointer-events-none opacity-60 ',
  options:
    'absolute m-0 p-0 list-none max-h-60 overflow-y-auto border border-gray-200 rounded-md drop-shadow-md w-full left-0 top-full mt-1 z-50',
  option: 'py-1 px-2 cursor-pointer',
  highlight: 'bg-blue-600',
};

const ButtonStyle: React.FC<{ title: Title; onClick: () => void }> = ({ title, onClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={(e) => handleClick(e)}
            variant="ghost"
            size="default"
            className="bg-transparent text-gray-400 border-none outline-none p-3 hover:text-gray-600 rounded-full"
          >
            {title == Title.Clear ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const OptionBtn: React.FC<{ option: string; onClick: (key: string) => void }> = ({ option, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(option);
  };
  return (
    <Button variant="outline" className="bg-gray-400 text-black hover:text-gray-400 rounded-full">
      {option}
      <X
        onClick={(e) => handleClick}
        className="ml-2 h-4 w-4 p-1 bg-gray-800 hover:bg-gray-600 rounded-full text-white"
      />
    </Button>
  );
};

export const MultiSelectField: Field = ({ fieldConfig, inputProps: { value = [], onChange }, fieldState }) => {
  const { isDisabled, options = [] } = fieldConfig;
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(0);
  const [optionsArr, setOptions] = useState(options);

  const handleChange = (event, newValue) => {
    onChange(newValue.map((option) => option.value));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.currentTarget.value !== '') {
      const currLength: number = event.currentTarget.value.length;
      setOpen(true);
      setOptions(
        options.filter((option) => option.label.substring(0, currLength).includes(event.currentTarget?.value))
      );
    } else {
      setOpen(false);
      setOptions(options);
    }
  };

  const clearOptions = (optionKey?: string | undefined) => {
    if (!optionKey) onChange(undefined);
    else onChange(value.filter((option) => option !== optionKey));
  };

  const addNewValue = (newValue: string) => {
    if (value.find((i) => i == newValue)) {
      onChange(value.filter((option) => option !== newValue));
      setOpen(false);
      return;
    }
    onChange([...value, newValue]);
    setOpen(false);
  };

  return (
    <FieldWrapper fieldConfig={fieldConfig} fieldState={fieldState}>
      <div
        tabIndex={0}
        className={`relative w-full min-h-6 border flex items-center gap-2 p-2 rounded-md outline-none focus:border-blue-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-50
        ${isDisabled && style.disabled} text-gray-400  
        ${open ? 'border-blue-500' : 'border-gray-400 hover:border-gray-900'} 
        `}
        // onBlur={() => setOpen(false)}
      >
        <span className="flex-grow flex gap-2 flex-wrap items-center">
          {value[0] ? (
            value.map((val) => <OptionBtn key={val} option={val} onClick={() => clearOptions(val)} />)
          ) : (
            <></>
          )}
          <Input
            type="text"
            placeholder="Select options"
            className="w-1/2 border-none border-white outline-none outline-white ring-0 focus:border-none focus:outline-none"
            onChange={(e) => onInputChange(e)}
          />
        </span>

        {value.length !== 0 && <ButtonStyle onClick={() => clearOptions()} title={Title.Clear} />}
        <ButtonStyle title={Title.Open} onClick={() => setOpen(!open)} />
        <ul className={`${style.options} bg-white ${open ? 'block' : 'hidden'}`}>
          {optionsArr.map((option, index) => (
            <li
              key={option.label}
              className={`${index == hover && 'bg-gray-200 text-blue-600'} ${style.option}`}
              onClick={(e) => {
                e.stopPropagation();
                addNewValue(option.label);
              }}
              onMouseOver={() => setHover(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </FieldWrapper>
  );
};
