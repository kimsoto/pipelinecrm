console.log('loading express server')
const mysql = require('mysql')
const sqlClient = mysql.createConnection({
    host: 'localhost',
    user: 'crm',
    password: 'j011y01d5@!n7n!(#01@5',
    database: 'pipeline-crm'
})
const express = require('express')
const nocache = require('nocache')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = 80

app.use(logger('dev'))
app.use(nocache())
app.use(express.json())

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+'/public/index.html'))
// })

// sends queries to mysql database
function runQuery(query) {
    sqlClient.connect(function(err) {
        if (err) throw err

        console.log('sql reply')
        sqlClient.query(query, function (err, res) {
            if (err) throw err
            res.json(res)
            sqlClient.end()
        })
    })
}

app.get('/api/team/:teamid', (req, res) => {
    const teamid = req.params.teamid
    runQuery(`select * from team where team_id = ${teamid};`)
    res.status(204)
})

app.get('/api/team/', (req, res) => {
    runQuery(`select * from team;`)
    res.status(204)
})

app.post('/api/team/', (req, res) => {
    runQuery(`insert into team (name) values ("insert name here");`)
    res.status(204)
})

app.put('/api/team/:teamid', (req, res) => {
    const teamid = req.params.teamid
    runQuery(`update team set name = "something";`)
    res.status(204)
})

app.delete('/api/team/:teamid', (req, res) => {
    const teamid = req.params.teamid
    runQuery(`delete from team where team_id = ${teamid};`)
    res.status(204)
})

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.send('404 sorry :(')
})

const server = app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

function gracefulShutdown() {
    console.log('closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
    })
}

process.once('SIGTERM', gracefulShutdown)
process.once('SIGINT', gracefulShutdown)