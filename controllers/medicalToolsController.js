const MedicalEquipment = require('../models/MedicalEquipment');

const getAllTools = async (req,res) => {
  try {
    const tools = await MedicalEquipment.find({ status: 'available'})
    res.render('medicalEquipment/index', {tools})

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
    res.render('medicalEquipment/show', {tool})
  } catch (error) {
    console.error('⚠️ Error searching equipment', error.message)
  }
}

const getToolsByCategory = async (req, res) => {
  try {
    const {category} = req.params
    const tools = await MedicalEquipment.find({category: category, status: 'available'})
    if(tools.length === 0){
      return res.send('No tools found in this category❗')
    }
    res.render('medicalEquipment/index', {tools, categoryName: category})
  } catch (error) {
    console.error('⚠️ Error searching category', error.message)
  }
}

const updateTool = async (req, res) => {
  try{

    if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Access denied!')
    }

    const tool = await MedicalEquipment.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidator: true})
    if (!tool){
      return res.send ('Tool is not exist❗')
    }
    res.redirect(`/medicalEquipment/${tool.id} `)
  } catch (error){
    console.error('⚠️ Error updating equipment', error.message)
  }
}

const deleteTool = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Access denied!')
    }
    const tool = await MedicalEquipment.findByIdAndDelete(req.params.id)

    if(!tool){
      return res.send('Tool is not exist❗')
    }
    res.redirect('medicalEquipment/get-all-tools')
  } catch (error) {
    console.error('⚠️ Error deleting equipment', error.message)
  }
}

module.exports = {
  getAllTools,
  getToolById,
  getToolsByCategory,
  updateTool,
  deleteTool
}
