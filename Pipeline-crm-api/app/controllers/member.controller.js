const Member = require('../models/member.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Please enter content! >:c'
    })
  }
  const member = new Member({
    name: req.body.name,
    email: req.body.email,
    team_id: req.body.team_id
  })
  Member.create(member, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while creating a new Member :c'
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
    Member.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Members :c'
        })
      else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Member.findById(req.params.memberid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Could not find Member with memberid ${req.params.memberid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error retrieving Member with memberid ${req.params.memberid}`
            })
          }
        } else res.send(data)
    })
}
