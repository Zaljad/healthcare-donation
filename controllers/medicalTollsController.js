const MedicalEquipment = require('../models/MedicalEquipment');

const createTool =async (req, res) => {
  try {
    const newTool = await MedicalEquipment.create(req.body)
    req.send(newTool)
  } catch (error) {
    console.error('⚠️ an error occurred creating a tool!', error.message)
  }
}
