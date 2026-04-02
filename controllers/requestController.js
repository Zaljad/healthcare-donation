const Request = require("../models/Request")
const MedicalEquipment = require("../models/MedicalEquipment")

const showCreateForm = async (req, res) => {
  try {
    const equipment = await MedicalEquipment.findById(req.params.id)
    if (!equipment) return res.send("Equipment not found")

    res.render("requests/create", { equipment })
  } catch (err) {
    console.log(err)
    res.send("Error loading create form")
  }
}

const createRequest = async (req, res) => {
  try {
    const equipment = await MedicalEquipment.findById(req.params.id)

    if (!equipment || equipment.status !== "available") {
      return res.send("Equipment not available")
    }

    await Request.create({
      requestedUser: req.session.userId,
      equipment: req.params.id,
    })

    res.redirect("/requests/my-request")
  } catch (err) {
    console.log(err)
    res.send("Error creating request")
  }
}

const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      requestedUser: req.session.userId,
    }).populate("equipment")

    res.render("requests/myRequests", { requests })

  } catch (err) {
    console.log(err)
    res.send("Error loading user requests")
  }
}

const getAllRequests = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.send("Access Denied - Admin Only")
    }

    const requests = await Request.find()
      .populate("requestedUser")
      .populate("equipment")

    res.render("requests/index", { requests, successMessage: null })
  } catch (err) {
    console.log(err)
    res.send("Error loading requests")
  }
}

const getRequestByStatus = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.send("Access Denied - Admin Only")
    }

    const requests = await Request.find({
      status: req.params.status,
    })
      .populate("requestedUser")
      .populate("equipment")

    res.render("requests/index", { requests, successMessage: null })
  } catch (err) {
    console.log(err)
    res.send("Error filtering requests")
  }
}

const updateRequestStatus = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.send("Access Denied - Admin Only")
    }

    const request = await Request.findById(req.params.id)
    if (!request) return res.send("Request not found")

    request.status = req.body.status
    await request.save()

    if (req.body.status === "approved") {
      await MedicalEquipment.findByIdAndUpdate(request.equipment, {
        status: "reserved",
      })
    } else if (req.body.status === "rejected") {
      await MedicalEquipment.findByIdAndUpdate(request.equipment, {
        status: "available",
      })
    }

    res.redirect("/requests")
  } catch (err) {
    console.log(err)
    res.send("Error updating request")
  }
}

const deleteRequest = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.send("Access Denied - Admin Only")
    }

    await Request.findByIdAndDelete(req.params.id)
    res.redirect("/requests")
  } catch (err) {
    console.log(err)
    res.send("Error deleting request")
  }
}

module.exports = {
  showCreateForm,
  createRequest,
  getUserRequests,
  getAllRequests,
  getRequestByStatus,
  updateRequestStatus,
  deleteRequest,
}
