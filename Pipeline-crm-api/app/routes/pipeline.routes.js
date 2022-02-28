module.exports = app => {
    const pipelines = require('../controllers/pipeline.controller.js')
    var router = require('express').Router()
    // Creates a new Pipeline
    router.post('/', pipelines.create)
    // Retrieves all Pipelines
    router.get('/', pipelines.findAll)
    // Retrieves all Pipelines of a given Team
    router.get('/:teamid/All', pipelines.findTeamPipelines)
    // Retrieves a single Pipeline with a pipelineid
    router.get('/:pipelineid', pipelines.findOne)
    app.use('/api/pipeline', router)
  }