export const getExistsMap = (values: string[] = []): Record<string, boolean> => {
  return values.reduce((acc, value) => {
    acc[value] = true;
    return acc;
  }, {} as Record<string, boolean>);
};
