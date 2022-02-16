module.exports = app => {
    const teams = require('../controllers/team.controller.js')
    var router = require('express').Router()
    // Creates a new Team
    router.post('/', teams.create)
    // Retrieves all Teams
    router.get('/', teams.findAll)
    // Retrieves a single Team with a teamid
    router.get('/:teamid', teams.findOne)
    // Updates a Team with a teamid
    router.put('/:teamid', teams.update)
    // Deletes a Team with a teamid
    router.delete('/:teamid', teams.delete)
    app.use('/api/team', router)
  }