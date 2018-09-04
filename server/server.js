const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./configuration/connect');
const port = process.env.PORT || 3001;

const userRoute = require('./routes/user');
const profileRoute = require('./routes/profile');
const postsRoute = require('./routes/posts');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(passport.initialize());
require('./configuration/passport')(passport);

app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
