const {Router} = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../models/profile');
const User = require('../models/user');

const profileRouter = Router();

profileRouter.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {id} = req.user;
    Profile.find({user: id})
        .then(profile => {
            res.json(profile || {});
        })
        .catch(err => res.status(400).json(err));
});

profileRouter.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {id} = req.user;
    const p = req.body;
    p.user = id;

    Profile.findOne({user: id})
        .populate('user', ['username', 'avatar'])
        .then(profile => {
            if (profile) {
                profile.location = p.location || profile.location;
                profile.birthPlace = p.birthPlace || profile.birthPlace;
                profile.status = p.status || profile.status;
                profile.interests = p.interests || profile.interests;
                profile.description = p.description || profile.description;
                profile.workExperience = p.workExperience || profile.workExperience;
            } else {
                profile = new Profile(p);
            }
            profile.save()
                .then(pro => res.json(pro))
                .catch(err => res.status(400).json(err));
        })
        .catch(e => es.status(400).json(e));

});

profileRouter.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {handle} = req.params;
    Profile.find({handle})
        .then(profile => {
            if (!profile || profile.length < 1) {
                return res.status(404).json({msg: 'No profile found'});
            }
            res.json(profile);
        })
        .catch(err => res.status(400).json(err));
});

profileRouter.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = req.user;
    Profile.find({user: user.id})
        .populate('user', ['username', 'avatar'])
        .then(profile => {
            if (!profile || profile.length < 1) {
                return res.status(404).json({msg: 'No profile found'});
            }
            res.json(profile);
        })
        .catch(err => res.status(400).json(err));
});

profileRouter.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find()
        .populate('user', ['username', 'avatar'])
        .then(profiles => {
           res.json(profiles);
        })
        .catch(err => res.status(400).json(err));
});

profileRouter.post('/interest', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = req.user;
    const {interest} = req.body;
    Profile.findOne({user: user.id})
        .then(profile => {
            if (!profile || profile.length < 1) {
                return res.status(404).json({msg: 'No profile found'});
            } else {
                profile.interests.push(interest);
                profile.save()
                    .then(p => {
                        res.json({msg: 'Profile updated'});
                    })
                    .catch(err => res.status(400).json(err));
            }
        })
        .catch(err => res.status(400).json(err));
});

profileRouter.delete('/interest', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = req.user;
    const {interest} = req.body;
    Profile.findOne({user: user.id})
        .then(profile => {
            if (!profile || profile.length < 1) {
                return res.status(404).json({msg: 'No profile found'});
            } else {
                profile.interests = [...profile.interests].filter(item => item.localeCompare(interest));
                profile.save()
                    .then(p => res.json({msg: 'Profile updated'}))
                    .catch(e => res.status(400).json(e));
            }
        })
        .catch(err => res.status(400).json(err));
});

module.exports = profileRouter;
