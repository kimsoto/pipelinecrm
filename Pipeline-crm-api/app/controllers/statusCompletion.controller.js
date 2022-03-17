const statusCompletion = require('../models/statusCompletion.model.js')

exports.findAllClientStatus = (req, res) => {
    statusCompletion.getAllClientStatus((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Client Status :c'
        })
      else res.send(data)
    })
}

exports.findAllStatus = (req, res) => {
  statusCompletion.getAllStatus((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while trying to get all Status :c'
      })
    else res.send(data)
  })
}

exports.findAllCompletion = (req, res) => {
  statusCompletion.getAllCompletion((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while trying to get all Completion :c'
      })
    else res.send(data)
  })
}
