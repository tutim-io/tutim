import {
  FieldConfig,
  FormConfig,
  FormLayout,
  InputType,
  LayoutGroupConfigs,
  LayoutGroupConfigsGroup,
} from '@tutim/types';

const isNestedField = (config: FieldConfig) => config.type === InputType.Object;

// Create a group configuration for a field.
// If the field has children, the group will include
// the children's keys in its `fields` array.
const createGroupForField = ({ key, label, children, type }: FieldConfig): LayoutGroupConfigsGroup => {
  if (!children || type === InputType.Array) return { key, fields: [key] };

  // Create a list of field keys for the children of the field.
  const fields = children.fields.map((child) => `${key}.${child.key}`);

  // Create a list of child configs for any children that have their own children.
  const childConfigs = children.fields
    .filter(isNestedField)
    .map((config) => ({ ...config, key: `${key}.${config.key}` }));

  // Recursively create groups for any children that have their own children.
  const subGroups = childConfigs.length ? { groups: childConfigs.map(createGroupForField) } : undefined;

  return { key, title: label, fields, subGroups };
};

// Map layout information onto the group configs.
const mapLayoutToGroups = (groupConfigs: LayoutGroupConfigs): LayoutGroupConfigs => {
  const { groups = [], layout = {} } = groupConfigs;

  // Add layout information to each group.
  const addLayout = (baseGroups: LayoutGroupConfigsGroup[]) =>
    baseGroups.map((group) => ({ ...group, layout: group.layout || layout[group.key] }));
  const topLevelGroups = addLayout(groups);

  // Add layout information to the subgroups of each group.
  const groupsWithLayout = topLevelGroups.map((group) => {
    const subs = group.subGroups?.groups;
    if (!subs) return group;

    const subGroups = addLayout(subs);
    return { ...group, subGroups: { groups: subGroups } };
  });

  return { groups: groupsWithLayout };
};

const enrichNestedUngrouped = (fields: FieldConfig[]) => (group: LayoutGroupConfigsGroup) => {
  const isInvalidGroup = group.fields.find((key) => key.includes('.'));
  if (isInvalidGroup) {
    throw new Error(`Invalid group: ${group.key}, top level groups can't include object field i.e '.'`);
  }
  const childConfigs = group.fields.map((key) => fields.find((f) => f.key === key)).filter(Boolean) as FieldConfig[];

  if (childConfigs.length === 1) {
    return createGroupForField(childConfigs[0]);
  } else if (childConfigs.length > 1) {
    const groups = childConfigs.filter(isNestedField).map(createGroupForField);
    const fieldKeys = childConfigs.map((f) => f.key);
    const subGroups = groups.length ? { groups } : undefined;
    const nestedGroup = { ...group, fields: fieldKeys, subGroups };
    return nestedGroup;
  }
  return group;
};

export const getLayoutGroups = ({ fields, layout }: FormConfig): LayoutGroupConfigsGroup[] => {
  const { groupConfigs } = layout || {};
  const { groups = [] } = groupConfigs || {};
  const mappedFields = groups.reduce((acc, group) => {
    group.fields.forEach((key) => (acc[key] = key));
    return acc;
  }, {});
  const ungroupedFields = fields.filter((field) => !mappedFields[field.key]);
  const enrichedGroups = groups.map(enrichNestedUngrouped(fields));
  const defaultGroups = ungroupedFields.map(createGroupForField);
  return [...enrichedGroups, ...defaultGroups];
};

// Create a layout configuration for a form based
const groupLayoutConfigsFromConfig = ({ fields, layout }: FormConfig): FormLayout['groupConfigs'] => {
  const groups = getLayoutGroups({ fields, layout });
  const layoutConfig = mapLayoutToGroups({ groups, layout: layout?.groupConfigs?.layout });

  return layoutConfig;
};

export const useFormLayout = (formConfig: FormConfig): FormLayout => {
  const groupConfigs = groupLayoutConfigsFromConfig(formConfig);
  return { ...formConfig.layout, groupConfigs };
};
