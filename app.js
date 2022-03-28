const express = require('express')
var morgan = require("morgan")
const app = express()
const api = require('./routes/api.js')

app.use(morgan('dev'))
app.use('/api', api)

app.use('/', (req, res, next) => {
	res.status(200).send({
		mensagem: 'Entre na rota /api/ramdom'
	})
})

app.use((req, res, next) => {
  const erro = new Error('Not found')
  erro.status = 404
  next(erro)
})
app.use((erro, re, res, next) => {
  erro.status = (erro.status || 500)
  return res.send({
    erro: erro.message
  })

})
module.exports = app