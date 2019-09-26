const admin = require('firebase-admin')

const db = admin.firestore()

module.exports = (req, res, next) => {
  admin.auth().verifyIdToken(req.headers.authorization)
    .then(function (decodedToken) {
      req.claims = decodedToken
      return db.collection('reqLogs').add({
        createdAt: new Date(),
        path: req.path,
        uid: req.claims.uid,
        email: req.claims.email
      })
    })
    .then(() => {
      next()
    })
    .catch(function (e) {
      console.error(e.message)
      res.status(401).send()
    })
}
