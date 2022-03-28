'use strict'

const http = require('http')
const app = require('./app')
const port = 3450
const server = http.createServer(app)
server.listen(port)