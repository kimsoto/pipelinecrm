module.exports = app => {
    const items = require('../controllers/item.controller.js')
    var router = require('express').Router()
    // Creates a new Item
    router.post('/', items.create)
    // Retrieves all Items
    router.get('/', items.findAll)
    // Retrieves all Items that belong to a Client
    router.get('/:clientid/All', items.findClientItems)
    // Retrieves a single Item with an itemid
    router.get('/:itemid', items.findOne)
    // Updates an Item with an itemid
    router.put('/:itemid', items.update)
    app.use('/api/item', router)
  }