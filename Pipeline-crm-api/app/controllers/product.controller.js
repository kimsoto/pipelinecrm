const Product = require('../models/product.model.js')

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Products :c'
        })
      else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Product.findById(req.params.productid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Could not find Product with productid ${req.params.productid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error retrieving Product with productid ${req.params.productid}`
            })
          }
        } else res.send(data)
    })
}

exports.findPipelineProducts = (req, res) => {
    Product.getPipelineProducts(req.params.pipelineid, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Could not find products from Pipeline ${req.params.pipelineid}.`
          })
        } else {
          res.status(500).send({
            message: `Wahh! There was an error retrieving products from pipeline ${req.params.pipelineid}`
          })
        }
      } else res.send(data)
  })
}
