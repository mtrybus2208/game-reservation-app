export const removeKeyInObj = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};
