const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const avatar = require('gravatar');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    data: {type: Date, default: Date.now}
});

UserSchema.statics.findByUsernameAndPassword = function (username, password) {
    return new Promise((resolve, reject) => {
        this.findOne({username})
            .then(user => {
                if (bcrypt.compareSync(password, user.password)) {
                    resolve(user);
                } else {
                    reject({msg: `User password didn't match`});
                }
            })
            .catch(err => {
                reject({msg: `User not found`});
            })
    })
}

UserSchema.statics.encryptPassword = function (password) {
    return bcrypt.hashSync(password);
};

const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function (next) {
    console.log('Saving.....');
    this.password = bcrypt.hashSync(this.password, 10);
    this.avatar = avatar.url(this.email, {s: '200', r: 'g', d: 'mm'});
    next();
});


module.exports = User;
