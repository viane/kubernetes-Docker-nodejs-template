const bluebird = require( 'bluebird')
const express = require('express');
const app = express();
const moment = require('moment');
const startTime = moment();
const mongoose = require('mongoose');
const visitRecord = require('/model/visit');

mongoose.Promise = bluebird
mongoose.set('debug', true)

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  return mongoose.connect("mongodb://mongo:27017/test", {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

app.get('/', function (req, res) {
  const now = new moment();
  res.status(200).json({message:'Hello World',
                        server_lived:moment.duration(now.diff(startTime)).humanize(true)
                      });
})

app.get('/history', (req,res)=>{
  // create and save the request info
  const record = new visitRecord();
  record.info = JSON.stringify(req.headers);

  record.save().then((data)=>{
    console.log("Record new visit history");

    visitRecord.find({}).then((data)=>{
      const history = data.map(record => {
        record.date = moment(record.date).format('MMMM Do YYYY, h:mm:ss a')
        record.info = JSON.parse(record.info)
        return record
      })
      res.status(200).json({visit_histroy:history})
    }).catch(err=>{
      console.error(err);
    })
  }).catch(err=>{
    console.error(err);
  })
})

app.get('/clear-history', (req,res)=>{
  // create and save the request info
  const record = new visitRecord();
    visitRecord.remove({}).then((data)=>{
      res.status(200).json({"message":"success"})}).catch(err=>{console.error(err)})
})

const server = app.listen(3000, function () {
   const host = server.address().address
   const port = server.address().port || "localhost"

   console.log("Server listening at http://%s:%s", host, port)

   connectWithRetry();
})
