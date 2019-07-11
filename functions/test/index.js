const app = require('express')()
const cors = require('cors')
require('express-async-errors')

app.use(cors())

app.post('/', async (req, res) => {
  const a = 3
  if (a === 3) throw Error('abc')
  res.send('post ok')
})

app.get('/', (req, res) => {
  res.send('get ok')
})

app.get('/:id', (req, res) => {
  res.send('get ok ' + req.params.id)
})

app.put('/:id', (req, res) => {
  res.send('put ok ' + req.params.id)
})

app.delete('/:id', (req, res) => {
  res.send('delete ok ' + req.params.id)
})

app.use((err, req, res, next) => {
  if (err.message === 'abc') return res.status(403).send('auth failed')
  res.send(err.message)
})

module.exports = app
