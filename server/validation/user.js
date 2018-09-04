const validator = require('validator');

const userValidator = (errors, data) => {
    const {email, password, password2, username} = data;

    if (!username || validator.isEmpty(username)) {
        errors.msg = `Username can't be empty`;
        return false;
    }

    if (!email || !validator.isEmail(email)) {
        errors.msg = 'Email is not in valid format';
        return false;
    }


    if (!password || validator.isEmpty(password)) {
        errors.msg = `Passwords can't be empty`;
        return false;
    }

    if (!password || validator.isEmpty(password) || !validator.equals(password, password2)) {
        errors.msg = `Passwords don't match`;
        return false;
    }

    return true;
}

module.exports = userValidator;
