const Donation = require("../models/Donation")

const createDonation = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    const donation = await Donation.create({
      donor: req.session.user._id,
      equipment: req.params.equipmentId,
    })

    res.status(201).json(donation)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating donation", error: error.message })
  }
}

const getAllDonations = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    const donations = await Donation.find()
      .populate("donor")
      .populate("equipment")

    res.status(200).json(donations)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching donations", error: error.message })
  }
}

const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor")
      .populate("equipment")

    if (!donation)
      return res.status(404).json({ message: "Donation not found" })

    res.status(200).json(donation)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching donation", error: error.message })
  }
}

const updateStatusDonation = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    if (req.session.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" })

    const { status } = req.body

    if (!["approved", "pending", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!updatedDonation)
      return res.status(404).json({ message: "Donation not found" })

    res.status(200).json(updatedDonation)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating donation", error: error.message })
  }
}

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateStatusDonation,
}
