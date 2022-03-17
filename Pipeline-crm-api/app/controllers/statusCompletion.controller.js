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
