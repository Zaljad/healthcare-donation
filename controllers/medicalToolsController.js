const MedicalEquipment = require('../models/MedicalEquipment');

const createTool =async (req, res) => {
  try {
    const newTool = await MedicalEquipment.create(req.body)
    res.send(newTool)
  } catch (error) {
    console.error('⚠️ an error occurred creating a tool!', error.message)
  }
}

const getAllTools = async (req,res) => {
  try {
    const tools = await MedicalEquipment.find({})
    res.send({tools})

  } catch (error) {
    console.error('⚠️ Error getting Medical Equipments!', error.message)
  }
}

const getToolById = async (req, res) => {
  try {
    const tool = await MedicalEquipment.findById(req.params.id)
    if(!tool){
      return res.send('Tool is not exist❗')
    }
    res.send(tool)
  } catch (error) {
    console.error('⚠️ Error searching equipment', error.message)
  }
}

const getToolsByCategory = async (req, res) => {
  try {
    const {category} = req.params
    const tools = await MedicalEquipment.find({category: category})
    if(tools.length === 0){
      return res.send('No tools found in this category❗')
    }
    res.send(tools)
  } catch (error) {
    console.error('⚠️ Error searching category', error.message)
  }
}

module.exports = {
  createTool,
  getAllTools,
  getToolById,
  getToolsByCategory
}
