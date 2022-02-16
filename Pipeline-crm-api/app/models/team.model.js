const sql = require('./db.js')

const Team = function(team) {
    this.name = team.name
}

Team.create = (newTeam, result) => {
    sql.query('INSERT INTO team SET ?', newTeam, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new team: ', { id: res.teamid, ...newTeam })
        result(null, { id: res.teamid, ...newTeam })
    })
}

Team.findById = (teamid, result) => {
    sql.query(`SELECT * FROM team WHERE team_id = ${teamid}`, (err, res) => {
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

Team.getAll = (result) => {
    sql.query('SELECT * FROM team', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all teams: ', res);
      result(null, res)
    })
}

Team.updateById = (teamid, team, result) => {
    sql.query(
      "UPDATE team SET name = ? WHERE team_id = ?",
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

Team.remove = (teamid, result) => {
    sql.query('DELETE FROM team WHERE team_id = ?', teamid, (err, res) => {
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