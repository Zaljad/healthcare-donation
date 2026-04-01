const Request = require('../models/Request');
const MedicalEquipment = require('../models/MedicalEquipment');

const createRequest = async (req,res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Please login first!')
    }

    const equipmentId = req.params.equipmentId;
    const equipment = await MedicalEquipment.findById(equipmentId)

    if(!equipment){
      return res.send('❌ Tool dose not exist!')
    }

    if(equipment.status !== 'available'){
      return res.send('Sorry, this tool is already reserved or taken 😞')
    }

    const newRequest = await Request.create({
      requestedUser: req.session.user._id,
      equipment: equipmentId,
      status: 'pending'
    })

    await MedicalEquipment.findByIdAndUpdate(equipmentId, {status: ' reserved'})

    res.send('✅ your request successfully sent!')
  } catch (error) {
    res.send('⚠️ an error occurred creating request!'), error.message
  }
}

const getAllRequests = async (req,res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Access denied!')
    }

    const requests = await Request.find()
    .populate('requestedUser', 'userName email')
    .populate('equipment')

    res.send(requests)
  } catch (error) {
    res.send('⚠️ error fetching requests!'), error.message
  }
}

const getRequestByStatus = async (req, res) => {
  try {
      if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Access denied!')
    }

    const {status} = req.body;

    const validStatuses = ['approved', 'pending', 'rejected']
    if(!validStatuses. includes(status)){
      return res.send('❌ Invalid status! Please use approved, pending, rejected')
    }

    const requests = await Request.find()
    .populate('requestedUser', 'userName email')
    .populate('equipment')

    if(requests.length === 0){
      return res.send('No result found 😞')
    }

    res.send(requests)
  } catch (error) {
    res.send('⚠️ Error fetching requests!'), error.message
  }
}

const getUserRequests = async (req, res) =>{
  try {
    const requests = await Request.find ({ requestedUser: req.session.user._id})
    .populate('equipment')
    .sort({ createAt: -1})

    if(request.length === 0){
      return res.send('You have no requests yet')
    }

    res.send(requests)
  } catch (error) {
    res.send('⚠️ Error fetching requests!'), error.message
  }
}

const updateRequestStatus = async (req,res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Access denied!')
    }

    const {status} = req.body;
    const requestId = req.params.id;
    const request = await Request.findById(requestId)

    if(!request){
      return res.send('Request not found❗')
    }

    if(status === 'approved'){
      await MedicalEquipment.findByIdAndUpdate(request.equipment, {status: 'completed'})
    }

    if(status === 'rejected'){
      await MedicalEquipment.findByIdAndUpdate(request.equipment, {status: 'available'})
    }

    request.status = status
    await request.save()

  } catch (error) {
    res.send('⚠️ error updating status!'), error.message
  }
}

const deleteRequest = async (req,res) => {
  try {
    if (!req.session.user || req.session.user.role !== 'admin'){
      return res.send('❌ Access denied!')
    }

    const request = await Request.findByIdAndDelete(req.params.id)

    res.send('Request deleted successfully 🪦')
  } catch (error) {
    res.send('⚠️ error deleting requests!'), error.message
  }
}

module.exports = {
  createRequest,
  getAllRequests,
  getRequestByStatus,
  getUserRequests,
  updateRequestStatus,
  deleteRequest
}

