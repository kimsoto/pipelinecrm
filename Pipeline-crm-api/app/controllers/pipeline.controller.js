const Pipeline = require('../models/pipeline.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Please enter content! >:c'
    })
  }
  const pipeline = new Pipeline({
    name: req.body.name,
    team_id: req.body.team_id
  })
  Pipeline.create(pipeline, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Oh no! An error occurred while creating a new Pipeline :c'
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
    Pipeline.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Oh no! An error occurred while trying to get all Pipelines :c'
        })
      else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Pipeline.findById(req.params.pipelineid, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Could not find Pipeline with pipelineid ${req.params.pipelineid}.`
            })
          } else {
            res.status(500).send({
              message: `Wahh! There was an error retrieving Pipeline with pipelineid ${req.params.pipelineid}`
            })
          }
        } else res.send(data)
    })
}

exports.findTeamPipelines = (req, res) => {
  Pipeline.getTeamPipelines(req.params.teamid, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Could not find Pipelines on team ${req.params.teamid}.`
          })
        } else {
          res.status(500).send({
            message: `Wahh! There was an error retrieving Pipelines on team ${req.params.teamid}`
          })
        }
      } else res.send(data)
  })
}
