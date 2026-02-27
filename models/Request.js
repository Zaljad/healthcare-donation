const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  status:{type: String,
    enum: ['approved', 'pending', 'rejected'],
    required:true
    },
  requestedUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true}

},{timestamps: true})

module.exports = mongoose. model('Request', requestSchema)
