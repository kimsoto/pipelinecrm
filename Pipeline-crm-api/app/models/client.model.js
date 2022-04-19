const sql = require('./db.js')

const Client = function(client) {
    this.status_id = client.status_id
    this.name = client.name
}

/**
 * Add a new Client
 * @param {*} newClient 
 * @request-example: Json
 * {
 *  "client_id": 1,
 *  "status_id": 2,
 *  "name": "Peppa Pig InC"
 * }
 * 
 * @success-example: 
 * {
 *  "status_id": 2,
 *  "name": "Peppa Pig In"
 * }
 * 
 */
Client.create = (newClient, result) => {
    sql.query('INSERT INTO pipeline_crm.client SET ?', newClient, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new client: ', { id: res.clientid, ...newClient })
        result(null, { id: res.clientid, ...newClient })
    })
}

/**
 * Finds a Client by Id
 * @param {*} clientid 
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/client/13
 * 
 * @success-example: 
 * {
 *  "client_id": 13,
    "status_id": 1,
    "name": "Client Name"
 * }
 * 
 */
Client.findById = (clientid, result) => {
    sql.query(`SELECT * FROM pipeline_crm.client WHERE client_id = ${clientid}`, (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        console.log('found client: ', res[0])
        result(null, res[0])
        return
      }
      // not found Client with the id
      result({ kind: 'not_found' }, null)
    })
}

/**
 * List all Clients
 * @request-example: Url
 * https://crm.alpinedatasolutions.com/api/client/
 * 
 * @success-example: 
 * [
    {
        "client_id": 13,
        "status_id": 1,
        "name": "Client Name",
        "code": "Active"
    },
    {
        "client_id": 14,
        "status_id": 1,
        "name": "Client 1",
        "code": "Active"
    }
    ...
  ]
 * 
 */
Client.getAll = (result) => {
    sql.query('SELECT client.*, client_status.code FROM pipeline_crm.client LEFT JOIN pipeline_crm.client_status ON client.status_id = client_status.status_id', (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return;
      }
      console.log('all clients: ', res);
      result(null, res)
    })
}

module.exports = Client