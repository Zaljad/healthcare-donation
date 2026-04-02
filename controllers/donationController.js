const Donation = require("../models/Donation")
const MedicalEquipment = require("../models/MedicalEquipment")

const createDonation = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send("You must be logged in")
    }

    const newTool = await MedicalEquipment.create({
      equipmentName: req.body.equipmentName,
      category: req.body.category,
      equipmentImg: req.body.equipmentImg,
      description: req.body.description,
      price: req.body.price,
      status: "available",
    })

    const donation = await Donation.create({
      donor: req.session.user._id,
      equipment: newTool._id,
      status: "pending",
    })

    const populatedDonation = await Donation.findById(donation._id)
      .populate("donor")
      .populate("equipment")

    return res.render("donations/show.ejs", {
      donation: populatedDonation,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor")
      .populate("equipment")

    res.render("donations/index.ejs", { donations })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching donations",
      error: error.message,
    })
  }
}

const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor")
      .populate("equipment")

    if (!donation) {
      return res.status(404).send("Donation not found")
    }

    res.render("donations/show.ejs", { donation })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching donation",
      error: error.message,
    })
  }
}

const updateStatusDonation = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).send("Access denied")
    }

    const { status } = req.body

    if (!["approved", "pending", "rejected"].includes(status)) {
      return res.status(400).send("Invalid status")
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!updatedDonation) {
      return res.status(404).send("Donation not found")
    }

    res.redirect("/donation/get-all-donations")
  } catch (error) {
    res.status(500).json({
      message: "Error updating donation",
      error: error.message,
    })
  }
}

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateStatusDonation,
}
