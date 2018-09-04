module.exports = function validate(data, validator) {
  const errors = {};
  let isValid = true;
  isValid = validator(errors, data);
  return {isValid, errors};
};
