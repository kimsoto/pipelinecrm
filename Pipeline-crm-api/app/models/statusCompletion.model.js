const sql = require('./db.js')

const statusCompletion = function() {}

statusCompletion.getAllClientStatus = (result) => {
    sql.query('SELECT * FROM client_status', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all client status: ', res);
      result(null, res)
    })
}

module.exports = statusCompletion