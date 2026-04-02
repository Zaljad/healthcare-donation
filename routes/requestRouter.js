const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const requestController = require("../controllers/requestController")

router.post("/create", requestController.createRequest)
router.get("/my-request", requestController.getUserRequests)
router.get("/", requestController.getAllRequests)
router.get("/status/:status", requestController.getRequestByStatus)
router.post("/update/:id", requestController.updateRequestStatus)
router.get("/delete/:id", requestController.deleteRequest)

module.exports = router
