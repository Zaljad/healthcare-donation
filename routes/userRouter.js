const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController.js")

router.get("/show-profile-page", userController.showProfilePage)
router.put("/update-user-profile", userController.updateUser)

router.get("/get-all-Userss", userController.getAllUsers)
router.get("/:id", userController.getUserById)

router.delete("/:id", userController.deleteUser)

module.exports = router
