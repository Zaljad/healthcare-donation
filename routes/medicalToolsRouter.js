const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const medicalToolsController = require("../controllers/medicalToolsController.js")

router.post("/create-tool", medicalToolsController.createTool)
router.get("/get-all-tools", medicalToolsController.getAllTools)
router.get("/:id", medicalToolsController.getToolById)
router.get("/:category", medicalToolsController.getToolsByCategory)
router.put("/:id", medicalToolsController.updateTool)
router.delete("/:id", medicalToolsController.deleteTool)

module.exports = router
