const validator = require('validator');

const userValidator = (errors, data) => {
    const {email, password, password2, username} = data;

    if (email && !validator.isEmail(email)) {
        errors.msg = 'Email is not in valid format';
        return false;
    }


    if (password && !validator.equals(password, password2)) {
        errors.msg = `Passwords don't match`;
        return false;
    }

    return true;
}

module.exports = userValidator;
