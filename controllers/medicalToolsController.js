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

const updateTool = async (req, res) => {
  try{
    const tool = await MedicalEquipment.findByIdAndUpdate(req.params.id,req.body,{new: true})
    if (!tool){
      return res.send ('Tool is not exist❗')
    }
    res.send(`${tool.id} is updated successfully ✨`)
  } catch (error){
    console.error('⚠️ Error updating equipment', error.message)
  }
}

const deleteTool = async (req, res) => {
  try {
    const tool = await MedicalEquipment.findByIdAndDelete(req.params.id)

    if(!tool){
      return res.send('Tool is not exist❗')
    }
    res.send(`${tool.id} is deleted successfully 🪦`)
  } catch (error) {
    console.error('⚠️ Error deleting equipment', error.message)
  }
}

module.exports = {
  createTool,
  getAllTools,
  getToolById,
  getToolsByCategory,
  updateTool,
  deleteTool
}
