const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitSchema = new Schema({
  "ip": String,
  "date": {type:String, default:new Date()},
  "info": String
})

module.exports =  mongoose.model('Visit', visitSchema);
