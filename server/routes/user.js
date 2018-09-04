const {Router} = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../configuration/config.json');
const User = require('../models/user');
const validator = require('../validation/validator');
const userValidator = require('../validation/user');
const userUpdateValidator = require('../validation/userupdate');
const loginValidator = require('../validation/login');
const {ObjectId} = require('mongoose');


const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('this is user root');
});

userRouter.put('/', passport.authenticate('jwt', {session: false}), async function (req, res) {
    const user = req.body;
    const {id} = req.user;
    const {email, username, password, password2} = user;
    if (id) {
        if (!email || !username) {
            return res.status(400).json({msg: 'Email and username are required'});
        }
        try {
            const propertiesAlreadyReserved = await User.findOne({$or: [{email: email}, {username: username}], _id: {$ne: id}});
            if (propertiesAlreadyReserved) {
                return res.status(400).json({msg: 'Different user with that email or username already exists'});
            }
        } catch (e) {
            return res.status(400).json(e);
        }

        if (password){
            if (password !== password2){
                return res.status(400).json({msg: `Passwords don't match`});
            }
            user.password = User.encryptPassword(password);
        }

        User.findByIdAndUpdate(id, {$set: user})
            .then(user => res.json({msg: 'User saved'}))
            .catch(e => res.status(400).json(e))
    } else {
        res.status(400).json({msg: 'User not found'});
    }
});

userRouter.post('/', (req, res) => {
    const usr = req.body;
    const {email} = usr;
    const {isValid, errors} = validator(usr, userValidator);

    if (isValid) {
        const user = new User(usr);
        User.findOne({email}).then(u => {
            if (!u) {
                user.save()
                    .then(success => {
                        res.json({msg: 'User saved'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({msg: 'Problems saving user'});
                    });
            } else {
                res.status(400).json({msg: 'User with that email already exists'});
            }
        })
    } else {
        res.status(400).json(errors);
    }
});

userRouter.post('/login', (req, res) => {
    const login = req.body;
    const {isValid, errors} = validator(login, loginValidator);
    if (isValid) {
        const {username, password} = req.body;
        User.findByUsernameAndPassword(username, password)
            .then(user => {
                const {id, username, email, avatar} = user;
                const token = 'Bearer ' + jwt.sign({id, username, email, avatar}, config.secret, {expiresIn: '1h'});
                res.json({msg: `User signed`, token});
            })
            .catch(err => {
                res.status(401).json(err);
            })
    } else {
        res.status(400).json(errors);
    }

});

userRouter.post('/test-jwt', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {id, username, avatar} = req.user;
    res.json({msg: 'Test over passport', user: {id, username, avatar}});
});

module.exports = userRouter;
