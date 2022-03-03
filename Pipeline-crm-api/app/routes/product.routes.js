module.exports = app => {
    const products = require('../controllers/product.controller.js')
    var router = require('express').Router()
    // Retrieves all Products
    router.get('/', products.findAll)
    // Retrieves all Products of a given Pipeline
    router.get('/:pipelineid/All', products.findPipelineProducts)
    // Retrieves a single Product with a productid
    router.get('/:productid', products.findOne)
    app.use('/api/product', router)
  }