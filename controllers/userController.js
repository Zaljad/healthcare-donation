const User = require("../models/User.js")
const Donation = require("../models/Donation.js")
const Request = require("../models/Request.js")

const getAllUsers = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }
    const users = await User.find()
    res.render("./users/all-users.ejs", { users })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    })
  }
}

const getUserById = async (req, res) => {
  try {
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
    res.render("./users/profile.ejs", { user: data })
  } catch (error) {
    res.status(500).json({
      message: "⚠️ Error finding user!",
      error: error.message,
    })
  }
}

const editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)

    if (!user) return res.status(404).json({ message: "User not found" })

    res.render("./users/edit.ejs", { user })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error loading edit form", error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)

    if (!user) return res.status(404).json({ message: "User not found" })

    user.userName = req.body.userName
    user.email = req.body.email
    user.phoneNum = req.body.phoneNum
    user.address = req.body.address

    await user.save()

    res.redirect(`/users/${user._id}?success=1`)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "admin") {
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
  getAllUsers,
  getUserById,
  editUserForm,
  updateUser,
  deleteUser,
}
