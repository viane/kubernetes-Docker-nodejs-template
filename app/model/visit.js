const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment');

const visitSchema = new Schema({
  "ip": String,
  "date": {type:String, default:moment()}
})

module.exports =  mongoose.model('Visit', visitSchema);
