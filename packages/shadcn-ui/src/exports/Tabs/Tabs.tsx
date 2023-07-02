import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface FormTabsProps {
  labels: string[];
  children: React.ReactNode[];
}

export const FormTabs = ({ labels, children }: FormTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} sx={{ marginBottom: '16px' }}>
        {labels.map((label) => (
          <Tab label={label} key={label} />
        ))}
      </Tabs>
      {children[value]}
    </Box>
  );
};
