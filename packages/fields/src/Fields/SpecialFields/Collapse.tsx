import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';

export function FieldCollapse({ children, error, title }) {
  const [open, setOpen] = useState(true);
  const errorLength = Object.keys(error || {}).length;

  const errorMessage = !!errorLength && (
    <FormHelperText error sx={{ px: 2 }}>
      {errorLength === 1 ? `There is one error in this field` : `There are ${errorLength} errors in this field`}
    </FormHelperText>
  );

  return (
    <Card sx={{ border: error ? '1px solid #dc3d3d99' : '1px solid rgba(211,211,211,0.6)' }}>
      <CardHeader
        sx={{ padding: '8px 16px', cursor: 'pointer', fontWeight: 300 }}
        title={title ?? 'Field'}
        onClick={() => setOpen(!open)}
        action={
          <IconButton aria-label="expand" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        }
      />
      <Collapse in={open} timeout="auto">
        <CardContent>{children}</CardContent>
      </Collapse>
      {errorMessage}
    </Card>
  );
}
