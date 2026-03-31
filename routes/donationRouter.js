const express = require("express")
const router = express.Router()

const donationController = require("../controllers/donationController")

router.post("/donations/:equipmentId", createDonation)
router.get("/donations", getAllDonations)
router.get("/donations/:id", getDonationById)
router.put("/donations/:id/status", updateStatusDonation)

module.exports = router
