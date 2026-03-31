const express = require('express')
const router = express.Router()

const requestController = require('../controllers/requestController')

router.post('/create-request', requestController.createRequest)
router.get('/get-all-requests', requestController.getAllRequests)
router.get('/:status', requestController.getRequestByStatus)
router.put('/:id', requestController.updateRequestStatus)
router.delete('/:id', requestController.deleteRequest)


module.exports = router
