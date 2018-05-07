const express = require('express');
const app = express();
const moment = require('moment');
const startTime = moment();
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://mongo:27017', function(err){
    if(err) console.error(err);

    console.log("MongoDB connection successful");
});

app.get('/', function (req, res) {
  const now = new moment();
  res.status(200).json({message:'Hello World',
                        server_lived:moment.duration(now.diff(startTime)).humanize(true)
                      });
})

const server = app.listen(3000, function () {
   const host = server.address().address
   const port = server.address().port || "localhost"

   console.log("Server listening at http://%s:%s", host, port)
})
