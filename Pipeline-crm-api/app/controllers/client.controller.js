const Client = require('../models/client.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Please enter content! >:c'
    })
  }
  const client = new Client({
    status_id: req.body.status_id,
    name: req.body.name
  })
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while creating a new Client :c'
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Clients :c'
        })
      else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Client.findById(req.params.clientid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Could not find Client with clientid ${req.params.clientid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error retrieving Client with clientid ${req.params.clientid}`
            })
          }
        } else res.send(data)
    })
}

