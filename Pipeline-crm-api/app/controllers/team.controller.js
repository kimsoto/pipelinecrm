const Team = require('../models/team.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Please enter content! >:c'
    })
  }
  const team = new Team({
    name: req.body.name
  })
  Team.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while creating a new Team :c'
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Teams :c'
        })
      else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Team.findById(req.params.teamid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Could not find Team with teamid ${req.params.teamid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error retrieving Team with teamid ${req.params.teamid}`
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
    Team.updateById(req.params.teamid, new Team(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Could not find Team with teamid ${req.params.teamid}.`
                })
            } else {
                res.status(500).send({
                    message: `Wahh! There was an error updating Team with teamid ${req.params.teamid}.`
                })
            }
        } else res.send(data)
    }) 
}

exports.delete = (req, res) => {
    Team.remove(req.params.teamid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Team with teamid ${req.params.teamid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error deleting Team with teamid ${req.params.teamid}.`
            })
          }
        } else res.send({ message: 'Team was deleted successfully!' })
    })
}