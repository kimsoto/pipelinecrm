module.exports = app => {
    const members = require('../controllers/member.controller.js')
    var router = require('express').Router()
    // Creates a new Member
    router.post('/', members.create)
    // Retrieves all Members
    router.get('/', members.findAll)
    // Retrieves all Members of a given Team
    router.get('/:teamid', members.findTeamMembers)
    // Retrieves a single Members with a memberid
    router.get('/:memberid', members.findOne)
    app.use('/api/member', router)
  }