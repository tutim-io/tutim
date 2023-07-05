import React from 'react';
import { FieldsPerRow } from '@tutim/types';

interface GridProps {
  children: React.ReactNode[];
  fieldsPerRow?: FieldsPerRow;
}

export const ROW_SIZE = {
  [FieldsPerRow.One]: 1,
  [FieldsPerRow.Two]: 2,
  [FieldsPerRow.Three]: 3,
};

export const FormGrid = ({ children, fieldsPerRow = FieldsPerRow.One }: GridProps): JSX.Element => {
  return (

    <div className={`w-full grid grid-cols-1 gap-2 row-gap-1 mt-0 md:gap-3
                    sm:grid-cols-${fieldsPerRow-1 === 0? ROW_SIZE[fieldsPerRow]: ROW_SIZE[fieldsPerRow-1]} 
                    md:grid-cols-${ROW_SIZE[fieldsPerRow]}`}>
      {children.map((child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  );
};
