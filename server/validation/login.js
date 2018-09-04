const validator = require('validator');

const userValidator = (errors, data) => {
  const {username,password} = data;

  if (!username || validator.isEmpty(username)) {
    errors.username = `Username can't be empty`;
    return false;
  }

  if(!password || validator.isEmpty(password)){
    errors.password = `Passwords can't be empty`;
    return false;
  }

  return true;
}

module.exports = userValidator;
