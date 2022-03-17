module.exports = app => {
    const clients = require('../controllers/client.controller.js')
    var router = require('express').Router()
    // Creates a new Client
    router.post('/', clients.create)
    // Retrieves all Client
    router.get('/', clients.findAll)
    // Retrieves a single Client with a clientid
    router.get('/:clientid', clients.findOne)
    app.use('/api/client', router)
  }