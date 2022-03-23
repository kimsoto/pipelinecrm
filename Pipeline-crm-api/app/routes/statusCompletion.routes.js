module.exports = app => {
    const statusCompletion = require('../controllers/statusCompletion.controller.js')
    var router = require('express').Router()
    // Retrieves all client status codes
    router.get('/clientStatus/', statusCompletion.findAllClientStatus)
    // Retrieves all status codes
    router.get('/status/', statusCompletion.findAllStatus)
    // Retrieves all completion codes and values
    router.get('/completion/', statusCompletion.findAllCompletion)
    app.use('/api/statusCompletion', router)
  }