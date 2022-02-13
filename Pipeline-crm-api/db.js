const mysql = require('mysql')
const sqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'crm',
    password: 'j011y01d5@!n7n!(#01@5',
    database: 'pipeline_crm'
})

sqlClient.connect(function(err) {
    if (err) throw err
    console.log('Connected!')
    let sql = 'select * from status;'
    sqlClient.query(sql, function (err, result) {
        if (err) throw err
        console.log(result)
    })
  })