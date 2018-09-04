const validator = require('validator');

const postValidator = (errors, data) => {
  const {text} = data;

  if(!text || validator.isEmpty(text)){
    errors.msg = 'Post text is required';
    return false;
  }

  if(!validator.isLength(text, {min: 5, max: 200})){
    errors.msg = 'Text has to be of length minimum 5 and maximum 200';
    return false;
  }

  return true;
}

module.exports = postValidator;
