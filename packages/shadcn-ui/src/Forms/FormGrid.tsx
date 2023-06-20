import React from 'react';
import MuiGrid from '@mui/material/Grid';
import { FieldsPerRow } from '@tutim/types';

interface GridProps {
  children: React.ReactNode[];
  fieldsPerRow?: FieldsPerRow;
}

export const ROW_SIZE = {
  [FieldsPerRow.One]: 12,
  [FieldsPerRow.Two]: 6,
  [FieldsPerRow.Three]: 4,
};

export const FormGrid = ({ children, fieldsPerRow = FieldsPerRow.One }: GridProps): JSX.Element => {
  return (
    <MuiGrid
      container
      sx={{ marginTop: '0px' }}
      spacing={{ xs: 2, md: 3 }}
      rowSpacing={1}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {children.map((child, index) => (
        <MuiGrid item xs={ROW_SIZE[fieldsPerRow]} key={index}>
          {child}
        </MuiGrid>
      ))}
    </MuiGrid>
  );
};
