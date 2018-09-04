const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const config = require('./config.json');
const User = mongoose.model('User');

const configPassport = function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(decodedToken, done) {
      User.findById(decodedToken.id)
          .then(user => done(null, user))
          .catch(err => done(err, false));
  }));
};

module.exports = configPassport;
