const express = require("express")
const router = express.Router()

const donationController = require("../controllers/donationController")

router.post("/:equipmentId", createDonation)
router.get("/get-all-donations", getAllDonations)
router.get("/:id", getDonationById)
router.put("/:id", updateStatusDonation)

module.exports = router
