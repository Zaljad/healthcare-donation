const Request = require('../models/Request');

const createRequest = async (req,res) => {
  try {
    const newRequest = await Request.create(req.body)
    res.send(newRequest)
  } catch (error) {
    res.send('⚠️ an error occurred creating request!'), error.message
  }
}

module.exports = {
  createRequest
}

