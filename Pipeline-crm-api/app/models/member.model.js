const sql = require('./db.js')

const Member = function(member) {
    this.team_id = member.team_id
    this.name = member.name
    this.email = member.email
}

Member.create = (newMember, result) => {
    sql.query('INSERT INTO member SET ?', newMember, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new member: ', { id: res.memberid, ...newMember })
        result(null, { id: res.memberid, ...newMember })
    })
}

Member.findById = (memberid, result) => {
    sql.query(`SELECT * FROM member WHERE member_id = ${memberid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        console.log('found member: ', res[0])
        result(null, res[0])
        return
      }
      // not found Member with the id
      result({ kind: 'not_found' }, null)
    })
}

Member.getAll = (result) => {
    sql.query('SELECT * FROM member', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all members: ', res);
      result(null, res)
    })
}

Member.getTeamMembers = (teamid, result) => {
  sql.query(`SELECT * FROM member WHERE team_id = ${teamid}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return;
    }
    console.log('all members of team: ', res);
    result(null, res)
  })
}

module.exports = Member