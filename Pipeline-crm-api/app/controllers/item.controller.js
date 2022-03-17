const Item = require('../models/item.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Please enter content! >:c'
    })
  }
  const item = new Item({
    completion_id: req.body.completion_id,
    status_id: req.body.status_id,
    client_id: req.body.client_id,
    product_id: req.body.product_id,
    title: req.body.title,
    contracted_rev: req.body.contracted_rev,
    planned_start: req.body.planned_start,
    planned_end: req.body.planned_end,
    actual_start: req.body.actual_start,
    actual_end: req.body.actual_end
  })
  Item.create(item, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while creating a new Item :c'
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
    Item.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Items :c'
        })
      else res.send(data)
    })
}

exports.findClientItems = (req, res) => {
    Item.getClientItems(req.params.clientid, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Could not find items from Client ${req.params.clientid}.`
          })
        } else {
          res.status(500).send({
            message: `Wahh! There was an error retrieving items from client ${req.params.clientid}`
          })
        }
      } else res.send(data)
  })
}

exports.findOne = (req, res) => {
    Item.findById(req.params.itemid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Could not find Item with itemid ${req.params.itemid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error retrieving Item with itemid ${req.params.itemid}`
            })
          }
        } else res.send(data)
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Please enter content! >:c'
        })
    }
    console.log(req.body)
    Item.updateById(req.params.itemid, new Item(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Item with itemid ${req.params.itemid}.`
                })
            } else {
                res.status(500).send({
                    message: `Wahh! There was an error updating Item with itemid ${req.params.itemid}.`
                })
            }
        } else res.send(data)
    }) 
}