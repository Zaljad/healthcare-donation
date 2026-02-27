const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  status:{type: String,
    enum: ['approved', 'pending', 'rejected'],
    default:'pending',
    required:true
    },
  donor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  equipment: {type: mongoose.Schema.Types.ObjectId, ref: 'MedicalEquipment', required:true}

},{timestamps: true})

module.exports = mongoose.model('Donation', donationSchema)
