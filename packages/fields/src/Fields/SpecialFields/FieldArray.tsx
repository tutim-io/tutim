import { Box } from '@mui/material';
import { Field, FieldsByKey } from '@tutim/types';
import { AddButton, DeleteButton } from '../../Buttons';
import { FieldGroup, getFieldsLayout } from '../../Forms';
import { FieldCollapse } from './Collapse';

const getRelativeFieldsByKey = (fieldsByKey: FieldsByKey): FieldsByKey => {
  const fields = Object.entries(fieldsByKey).map(([key, field]) => {
    const parts = key.split('.');
    const arrayIndex = [...parts].reverse().findIndex((part) => !isNaN(Number(part)));
    const relativeKeys = parts.slice(-arrayIndex);

    const relativeKey = relativeKeys.join('.');
    return [relativeKey, field];
  });
  return Object.fromEntries(fields);
};

export const FieldArray: Field = ({ fieldConfig, multiProps }) => {
  if (!multiProps) throw Error('Invalid');
  const { onAdd, arrayFields, layout, error } = multiProps;
  const { key, label } = fieldConfig;

  const arrayFieldsRender = arrayFields.map(({ id, fieldsByKey, onDelete }, ix) => {
    const fieldsLayout = getFieldsLayout({
      fieldsByKey: getRelativeFieldsByKey(fieldsByKey),
      layout,
    });

    return (
      <FieldCollapse
        key={id}
        error={error?.[ix]}
        title={
          <>
            <span style={{ fontSize: '16px' }}>{label} </span>
            <span style={{ fontSize: '14px' }}>({ix + 1})</span>
          </>
        }
      >
        <Box key={id} sx={{ p: 2, border: '1px dashed rgba(0, 0, 0, 0.1)', display: 'flex' }}>
          <FieldGroup>{fieldsLayout}</FieldGroup>
          <div style={{ width: '100px', display: 'flex', alignItems: 'baseline', justifyContent: 'end' }}>
            <DeleteButton key="remove" onClick={onDelete} />
          </div>
        </Box>
      </FieldCollapse>
    );
  });

  return (
    <div key={key}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{label}</h3>
      </div>
      <FieldGroup>{arrayFieldsRender}</FieldGroup>
      <div style={{ marginTop: '10px' }}>
        <AddButton onClick={onAdd} />
      </div>
    </div>
  );
};
