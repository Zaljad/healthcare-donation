const mongoose = require('mongoose')

const medicalEquipmentSchema = new mongoose.Schema({
  equipmentName: {type: String, required:true},
  status:{type: String,
    enum: ['available', 'reserved', 'completed'],
    default: 'available',
    required:true
    },
  category: {type: String, required:true},
  equipmentImg: {type: String, required:true},
  description: {type: String, required:true},
  price: {type: Number, required:true}
},{timestamps: true})

module.exports = mongoose.model('MedicalEquipment', medicalEquipmentSchema)
