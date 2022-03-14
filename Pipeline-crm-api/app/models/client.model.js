const sql = require('./db.js')

const Client = function(client) {
    this.status_id = client.status_id
    this.name = client.name
}

Client.create = (newClient, result) => {
    sql.query('INSERT INTO client SET ?', newClient, (err, res) => {
        if (err) {
          console.log('error: ', err)
          result(err, null)
          return
        }
        console.log('created new client: ', { id: res.clientid, ...newClient })
        result(null, { id: res.clientid, ...newClient })
    })
}

Client.findById = (clientid, result) => {
    sql.query(`SELECT * FROM client WHERE client_id = ${clientid}`, (err, res) => {
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

Client.getAll = (result) => {
    sql.query('SELECT * FROM client', (err, res) => {
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