const sql = require('./db.js')

const statusCompletion = function() {}

/**
 * List all Client Status'
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/statusCompletion/clientStatus/
 * 
 * @success-example: 
 * [
    {
        "status_id": 1,
        "code": "Active"
    },
    {
        "status_id": 2,
        "code": "Dormant"
    },
    {
        "status_id": 3,
        "code": "Potential"
    }
  ]
 * 
 */
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

/**
 * List all Status'
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/statusCompletion/status/
 * 
 * @success-example: 
 * [
    {
        "status_id": 1,
        "code": "Backlog"
    },
    {
        "status_id": 5,
        "code": "Billed"
    },
    {
        "status_id": 4,
        "code": "Cancelled"
    }
    ...
  ]
 * 
 */
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

/**
 * List all Completions
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/statusCompletion/completion/
 * 
 * @success-example: 
 * [
    {
        "completion_id": 1,
        "code": "New",
        "value": 0
    },
    {
        "completion_id": 2,
        "code": "1/4",
        "value": 0.25
    },
    {
        "completion_id": 3,
        "code": "1/2",
        "value": 0.5
    }
    ...
  ]
 * 
 */
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