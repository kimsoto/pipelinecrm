const sql = require('./db.js')

const Member = function(member) {
    this.team_id = member.team_id
    this.name = member.name
    this.email = member.email
}

/**
 * Add a new Member
 * @param {*} newMember 
 * @request-example: Json
 * {
    "name": "James Kennedy",
    "email": "james.kennedy@alpinedatasolutions.com",
    "team_id": 1
  }
 * 
 * @success-example: 
 * {
    "member_id": 7,
    "name": "James Kennedy",
    "email": "james.kennedy@alpinedatasolutions.com",
    "team_id": 1
  }
 * 
 */
Member.create = (newMember, result) => {
    sql.query('INSERT INTO pipeline_crm.member SET ?', newMember, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new member: ', { id: res.memberid, ...newMember })
        result(null, { id: res.memberid, ...newMember })
    })
}

/**
 * Finds an Member by Id
 * @param {*} memberid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/member/1
 * 
 * @success-example: 
 * {
    "member_id": 1,
    "team_id": 1,
    "name": "David Willson",
    "email": "david.willson@alpinedatasolutions.com"
  }
 * 
 */
Member.findById = (memberid, result) => {
    sql.query(`SELECT * FROM pipeline_crm.member WHERE member_id = ${memberid}`, (err, res) => {
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

/**
 * Lists all Members
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/member/
 * 
 * @success-example: 
 * [
    {
        "member_id": 1,
        "team_id": 1,
        "name": "David Willson",
        "email": "david.willson@alpinedatasolutions.com"
    }
    ...
  ]
 * 
 */
Member.getAll = (result) => {
    sql.query('SELECT * FROM pipeline_crm.member', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all members: ', res);
      result(null, res)
    })
}

/**
 * Lists all Team Members
 * @param {*} teamid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/member/1/All
 * 
 * @success-example: 
 * [
    {
        "member_id": 1,
        "team_id": 1,
        "name": "David Willson",
        "email": "david.willson@alpinedatasolutions.com"
    }
    ...
  ]
 * 
 */
Member.getTeamMembers = (teamid, result) => {
  sql.query(`SELECT * FROM pipeline_crm.member WHERE team_id = ${teamid}`, (err, res) => {
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