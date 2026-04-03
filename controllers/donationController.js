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
      equipmentImg: req.body.equipmentImg?.trim() || null,
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

const getEditDonationForm = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor")
      .populate("equipment")

    if (!donation) {
      return res.status(404).send("Donation not found")
    }

    res.render("donations/edit", { donation })
  } catch (error) {
    console.log(error)
    res.send("Error loading edit page")
  }
}
const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "equipment"
    )
    if (!donation) return res.status(404).send("Donation not found")

    donation.equipment.equipmentName = req.body.equipmentName
    donation.equipment.category = req.body.category
    donation.equipment.equipmentImg = req.body.equipmentImg
    donation.equipment.description = req.body.description
    donation.equipment.price = req.body.price

    if (req.session.user && req.session.user.role === "admin") {
      const { status } = req.body
      if (["pending", "approved", "rejected"].includes(status)) {
        donation.status = status
      }
    }

    await donation.equipment.save()
    await donation.save()

    res.redirect(`/donation/${id}`)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error updating donation")
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

module.exports = {
  createDonation,
  getEditDonationForm,
  updateDonation,
  getAllDonations,
  getDonationById,
}
