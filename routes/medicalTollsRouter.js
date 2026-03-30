const express = require('express')
const router = express.Router()

const authController = require('../controllers/medicalTollsController.js')

router.post('/create-tool', medicalTollsController.createTool)
router.get('/get-all-tools',medicalTollsController.getAllTools)
router.get('/get-tools-by-category',medicalTollsController.getToolsByCategory)
router.get('/:id',medicalTollsController.getToolById)
router.put('/:id',medicalTollsController.updateTool)
router.delete('/:id',medicalTollsController.DeleteTool)

module.exports = router
