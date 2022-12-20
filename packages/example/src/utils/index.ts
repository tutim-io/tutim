export const getDataAsync = (): Promise<Record<string, any>> => {
  console.log('requesting data asynchronously');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        firstName: 'John' + Math.floor(Math.random() * 100),
        lastName: 'Doe',
        age: 30,
      });
    }, 1000);
  });
};

export const getSelectOptionsAsync = (): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]);
    }, 1000);
  });
};
