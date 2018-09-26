const mongoose = require('mongoose');
const {mongoUri} = require('./config.json');

mongoose.connect(process.env.MONGO_URI || mongoUri)
        .then(connection => {
          console.log('Connection to mongo database successfull');
        }).catch(err => {
          console.log(err);
        });
