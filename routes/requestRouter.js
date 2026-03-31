const express = require('express')
const router = express.Router()

const requestController = require('../controllers/requestController')

router.post('/create-request', requestController.createRequest)
router.get('/get-all-requests', requestController.getAllRequests)
router.get('/:id', requestController.getRequestById)
router.get('/:userId', requestController.getRequestByUserId)
router.put('/:id', requestController.updateRequest)
router.delete('/:id', requestController.deleteRequest)


module.exports = router
