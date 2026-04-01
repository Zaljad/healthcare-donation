const express = require("express")
const router = express.Router()

const requestController = require("../controllers/requestController")

router.post("/create/:equipmentId", requestController.createRequest)
router.get("/get-all-requests", requestController.getAllRequests)
router.get("/:filter", requestController.getRequestByStatus)
router.get("/get-use-requests", requestController.getUserRequests)
router.put("/update/:id", requestController.updateRequestStatus)
router.delete("/delete/:id", requestController.deleteRequest)

router.get("/create/:equipmentId", (req, res) =>
  res.render("./request/create.ejs")
)
router.get("/:filter", (req, res) => res.render("./request/filter.ejs"))

module.exports = router
