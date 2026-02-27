const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  status:{type: String,
    enum: ['approved', 'pending', 'rejected'],
    defult: 'pending',
    required:true
    },
  requestedUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  equipment: {type: mongoose.Schema.Types.ObjectId, ref: 'MedicalEquipment', required:true}
},{timestamps: true})

module.exports = mongoose.model('Request', requestSchema)
