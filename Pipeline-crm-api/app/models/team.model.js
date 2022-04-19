const sql = require('./db.js')

const Team = function(team) {
    this.name = team.name
}

/**
 * Add a new Team
 * @param {*} newTeam 
 * @request-example: Json
 * {
    "name": "Alpine Executives"
  }
 * 
 * @success-example: 
 * {
    "team_id": 1
    "name": "Alpine Executives"
  }
 * 
 */
Team.create = (newTeam, result) => {
    sql.query('INSERT INTO pipeline_crm.team SET ?', newTeam, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new team: ', { id: res.teamid, ...newTeam })
        result(null, { id: res.teamid, ...newTeam })
    })
}

/**
 * Finds an Team by Id
 * @param {*} teamid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/team/1/
 * 
 * @success-example: 
 * {
    "team_id": 1,
    "name": "Alpine Executives"
  }
 * 
 */
Team.findById = (teamid, result) => {
    sql.query(`SELECT * FROM pipeline_crm.team WHERE team_id = ${teamid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        console.log('found team: ', res[0])
        result(null, res[0])
        return
      }
      // not found Team with the id
      result({ kind: 'not_found' }, null)
    })
}

/**
 * List all Teams
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/team/
 * 
 * @success-example: 
 * [
    {
        "team_id": 1,
        "name": "Alpine Executives"
    }
  ]
 * 
 */
Team.getAll = (result) => {
    sql.query('SELECT * FROM pipeline_crm.team', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all teams: ', res);
      result(null, res)
    })
}

/**
 * Updates a Team by Id
 * @param {*} teamid, team 
 * @param {*} team 
 * @request-example: Json
 * {
    "name": "Alpine Executives"
  }
 * 
 * @success-example: 
 * {
    "team_id": 1,
    "name": "Alpine Executives"
  }
 * 
 */
Team.updateById = (teamid, team, result) => {
    sql.query(
      "UPDATE pipeline_crm.team SET name = ? WHERE team_id = ?",
      [team.name, teamid],
      (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(null, err)
          return
        }
        if (res.affectedRows == 0) {
          // not found Team with the teamid
          result({ kind: 'not_found' }, null)
          return
        }
        console.log('updated team: ', { teamid: teamid, ...team })
        result(null, { teamid: teamid, ...team })
      }
    )
}

/**
 * Deletes a Team by Id
 * @param {*} teamid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/team/1/
 * 
 * @success-example: 
 * { message: 'Team was deleted successfully!' }
 * 
 */
Team.remove = (teamid, result) => {
    sql.query('DELETE FROM pipeline_crm.team WHERE team_id = ?', teamid, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }
      if (res.affectedRows == 0) {
        // not found Team with the teamid
        result({ kind: 'not_found' }, null)
        return
      }
      console.log('deleted team with teamid: ', teamid)
      result(null, res)
    })
}

module.exports = Team