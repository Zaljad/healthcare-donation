const express = require("express")
const router = express.Router()

const middleware = require("../middleware")

const medicalToolsController = require("../controllers/medicalToolsController.js")

router.get("/", medicalToolsController.getAllTools)
router.get("/get-all-tools", medicalToolsController.getAllTools)
router.get("/:id", medicalToolsController.getToolById)
router.get("/category/:category", medicalToolsController.getToolsByCategory)
router.get("/:id/edit", medicalToolsController.showEditForm)
router.put("/:id", medicalToolsController.updateTool)
router.delete("/:id", medicalToolsController.deleteTool)

module.exports = router
