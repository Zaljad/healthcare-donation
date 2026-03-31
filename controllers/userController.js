const User = require("../models/User.js")
const Donation = require("../models/Donation.js")
const Request = require("../models/Request.js")

const showProfilePage = async (req, res) => {
  try {
    res.send("Profile Page")
  } catch (error) {
    res
      .status(404)
      .json({ message: "⚠️ Error showing Profile Page!", error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    if (!req.session.user) return res.send("Please login first")

    if (req.session.user.role !== "admin") {
      return res.send("Access denied")
    }

    const users = await User.find()

    res.send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    if (!req.session.user) return res.send("Please login first")

    if (req.session.user.role !== "admin") {
      return res.send("Access denied")
    }

    const user = await User.findById(req.params.id)

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

    res.send(data)
  } catch (error) {
    res
      .status(500)
      .json({ menubar: "⚠️ Error finding user! ", error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.session.user._id

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    })

    res.send({
      message: "User updated successfully",
      user: updatedUser,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    if (!req.session.user) return res.send("Please login first")

    if (req.session.user.role !== "admin") {
      return res.send("Access denied")
    }

    await User.findByIdAndDelete(req.params.id)

    res.send("User deleted successfully")
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  showProfilePage,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
