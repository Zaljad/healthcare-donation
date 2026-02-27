const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  status:{type: String,
    enum: ['approved', 'pending', 'rejected'],
    required:true
    },
  donor: {type: mongoose.Schema.Types.ObjectId, ref: User, required:true}

},{timestamps: true})

module.exports = mongoose. model('Donation', donationSchema)
