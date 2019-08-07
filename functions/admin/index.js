const app = require('express')()
const cors = require('cors')
const admin = require('firebase-admin')
require('express-async-errors')

const db = admin.firestore()

app.use(cors({ origin: true }))

app.use(require('../middlewares/verifyToken'))

app.get('/users', async (req, res) => {
  if (req.claims.level > 0) return res.status(403).send({ message: 'not authorized' })
  let { offset, limit, order, sort } = req.query
  offset = Number(offset)
  limit = Number(limit)
  const r = {
    items: [],
    totalCount: 0
  }
  const t = await db.collection('infos').doc('users').get()
  r.totalCount = t.data().counter
  const s = await db.collection('users').orderBy(order, sort).offset(offset).limit(limit).get()

  s.forEach(v => {
    r.items.push(v.data())
  })
  res.send(r)
})

app.use(require('../middlewares/error'))

module.exports = app
