console.log('loading express server')
const express = require('express')
const cors = require('cors')
const path = __dirname + '/app/views/'
const app = express()
const PORT = 3000
let corsOptions = {
    // origin: 'http://localhost:3001'
    origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path))
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.sendFile(path + 'index.html')
// })
app.get('/', (req, res) => {
    res.send("express api!")
})
require("./app/routes/team.routes.js")(app)
require("./app/routes/member.routes.js")(app)
require("./app/routes/pipeline.routes.js")(app)
require("./app/routes/product.routes.js")(app)
require("./app/routes/client.routes.js")(app)
require("./app/routes/item.routes.js")(app)
require("./app/routes/statusCompletion.routes.js")(app)

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