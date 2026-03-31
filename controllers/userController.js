const User = require("../models/User.js")
const Donation = require("../models/Donation.js")
const Request = require("../models/Request.js")

const showProfilePage = async (req, res) => {
  try {
    res.status(200).json({ message: "Profile Page" })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error showing Profile Page!",
      error: error.message,
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    if (req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    const users = await User.find()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    })
  }
}

const getUserById = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    if (req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ message: "User not found" })

    const donations = await Donation.find({ donor: user._id }).populate(
      "equipment"
    )
    const requests = await Request.find({ requestedUser: user._id }).populate(
      "equipment"
    )

    const data = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      phoneNum: user.phoneNum,
      address: user.address,
      role: user.role,
      donations,
      requests,
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error finding user!",
      error: error.message,
    })
  }
}

const updateUser = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    const userId = req.session.user._id

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    })

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "Please login first" })

    if (req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) return res.status(404).json({ message: "User not found" })

    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    })
  }
}

module.exports = {
  showProfilePage,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
