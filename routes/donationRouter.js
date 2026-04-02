const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const donationController = require("../controllers/donationController")
router.get("/:id/edit", donationController.getEditDonationForm)
router.put("/:id/edit", donationController.updateDonation)
router.get("/new", (req, res) => {
  res.render("donations/new-donations.ejs")
})
router.post("/create-donation", donationController.createDonation)
router.get("/get-all-donations", donationController.getAllDonations)
router.get("/:id", donationController.getDonationById)

module.exports = router
