const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController.js")

router.get("/show-profile-page", userController.showProfilePage)
router.put("/update-user-profile", userController.updateUser)

router.get("/get-all-Users", userController.getAllUsers)
router.get("/:id", userController.getUserById)

router.delete("/:id", userController.deleteUser)

router.get("/show-profile-page", (req, res) => {
  res.render("./users/profile.ejs")
})
module.exports = router
