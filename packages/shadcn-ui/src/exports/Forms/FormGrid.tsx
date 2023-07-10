import React from 'react';
import { FieldsPerRow } from '@tutim/types';

interface GridProps {
  children: React.ReactNode[];
  fieldsPerRow?: FieldsPerRow;
}

export const FormGrid = ({ children, fieldsPerRow = FieldsPerRow.One }: GridProps): JSX.Element => {

  return (
    <>
      <div className="sm:grid-cols-1 md:grid-cols-2"></div>
      <div className="sm:grid-cols-2 md:grid-cols-3"></div>
      <div
        className={`w-full grid 
                     grid-cols-1
                     sm:grid-cols-${fieldsPerRow - 1}
                     md:grid-cols-${fieldsPerRow}
                     gap-3 mt-0 mx-2 md:bg-white`}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full">
            {child}
          </div>
        ))}
      </div>
    </>
  );
};
