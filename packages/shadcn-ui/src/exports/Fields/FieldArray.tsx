import { Field, FieldsByKey } from '@tutim/types';
import { AddButton, DeleteButton } from '../Buttons';
import { FieldGroup, getFieldsLayout } from '../Forms';
import { FieldCollapse } from '../Forms/Collapse';

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
        <div key={id} className='flex p-2 border border-gray-300 border-dashed'>
          <FieldGroup>{fieldsLayout}</FieldGroup>
          <div>
            <DeleteButton key="remove" onClick={onDelete} />
          </div>
        </div>
      </FieldCollapse>
    );
  });

  return (
    <div key={key}>
      <div className='mb-2 text-2xl'>{label}</div>
      <FieldGroup>{arrayFieldsRender}</FieldGroup>
      <div className='mt-6'>
        <AddButton onClick={onAdd} />
      </div>
    </div>
  );
};
