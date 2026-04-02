const express = require("express")
const router = express.Router()

const donationController = require("../controllers/donationController")

router.get("/new", (req,res) => {
  res.render("donations/new-donations.ejs")
})
router.post("/create-donation", donationController.createDonation)

router.get("/get-all-donations", donationController.getAllDonations)
router.get("/:id", donationController.getDonationById)
router.put("/:id", donationController.updateStatusDonation)

module.exports = router
