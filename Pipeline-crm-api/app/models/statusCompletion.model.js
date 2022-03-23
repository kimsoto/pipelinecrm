const sql = require('./db.js')

const statusCompletion = function() {}

statusCompletion.getAllClientStatus = (result) => {
    sql.query('SELECT * FROM pipeline_crm.client_status', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all client status: ', res);
      result(null, res)
    })
}

statusCompletion.getAllStatus = (result) => {
  sql.query('SELECT * FROM pipeline_crm.status', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return;
    }
    console.log('all status: ', res);
    result(null, res)
  })
}

statusCompletion.getAllCompletion = (result) => {
  sql.query('SELECT * FROM pipeline_crm.completion', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return;
    }
    console.log('all completion: ', res);
    result(null, res)
  })
}

module.exports = statusCompletion