const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const requestController = require("../controllers/requestController")

router.post("/create", controller.createRequest)
router.get("/my-request", controller.getUserRequests)
router.get("/", controller.getAllRequests)
router.get("/status/:status", controller.getRequestByStatus)
router.post("/update/:id", controller.updateRequestStatus)
router.get("/delete/:id", controller.deleteRequest)

module.exports = router
