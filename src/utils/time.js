export const isValidTime = (val) => {
  const regexp = /\b((1[0-2]|0?[1-9]):([0-5][0-9]))/;

  return regexp.test(val);
};

export const test = () => {};
