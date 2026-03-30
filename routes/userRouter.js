const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController.js")

router.get("/profile", userController.showProfilePage)
router.put("/profile", userController.updateUser)

router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)

router.delete("/users/:id", userController.deleteUser)

module.exports = router
