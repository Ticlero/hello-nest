export const findIndex = (arr: any[], key: string, fvalue: any): number => {
  const findIndex = arr.findIndex((arr) => {
    return arr[key] === fvalue;
  });

  return findIndex;
};
