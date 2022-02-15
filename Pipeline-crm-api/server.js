console.log('loading express server')
const express = require('express')
const cors = require('cors')
const path = __dirname + '/app/views/'
const app = express()
const PORT = 3000
let corsOptions = {
    origin: 'http://localhost:3001'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path + 'index.html')
})
require("./app/routes/team.routes.js")(app)

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