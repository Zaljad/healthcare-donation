const express = require('express')
const router = express.Router()

const medicalToolsController = require('../controllers/medicalToolsController.js')

router.post('/create-tool', medicalToolsController.createTool)
router.get('/get-all-tools',medicalToolsController.getAllTools)
router.get('/:category',medicalToolsController.getToolsByCategory)
router.get('/:id',medicalToolsController.getToolById)/*
router.put('/:id',medicalToolsController.updateTool)
router.delete('/:id',medicalToolsController.DeleteTool) */

module.exports = router
