const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const userController = require("../controllers/userController.js")

router.get("/edit-profile", userController.editUserForm)

router.post("/edit-profile", userController.updateUser)

router.get("/get-all-Users", userController.getAllUsers)

router.get("/:id", userController.getUserById)

router.get("/details/:id", userController.getUserById)

router.delete("/:id", userController.deleteUser)

module.exports = router
