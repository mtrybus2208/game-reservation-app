const Model = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
};

export const mapUserData = (obj) => Object.keys(obj)
  .filter(prop => Model[prop] !== undefined)
  .reduce((o, key) => ({ ...o, [key]: obj[key] }), {});
