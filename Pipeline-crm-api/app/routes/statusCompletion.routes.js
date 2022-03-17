module.exports = app => {
    const statusCompletion = require('../controllers/statusCompletion.controller.js')
    var router = require('express').Router()
    // Retrieves all client status codes
    router.get('/clientStatus/', statusCompletion.findAllClientStatus)
    app.use('/api/statusCompletion', router)
  }