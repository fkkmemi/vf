const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({ credential: admin.credential.cert(require('./key.json')) })

const db = admin.firestore()

exports.admin = functions.https.onRequest(require('./admin'))
exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, emailVerified, photoURL, disabled } = user
  const claims = { level: 2 }
  if (functions.config().admin.email === user.email && user.emailVerified) claims.level = 0
  await admin.auth().setCustomUserClaims(uid, claims)

  const d = {
    uid,
    email,
    displayName,
    emailVerified,
    photoURL,
    disabled,
    level:
    claims.level,
    createdAt: new Date(),
    updatedAt: new Date(),
    visitedAt: new Date(),
    visitCount: 0
  }
  const r = await db.collection('users').doc(uid).set(d)
  return r
})
exports.deleteUser = functions.auth.user().onDelete((user) => {
  return db.collection('users').doc(user.uid).delete()
})

db.collection('infos').doc('users').get()
  .then(s => {
    if (!s.exists) db.collection('infos').doc('users').set({ counter: 0 })
  })
exports.incrementUserCount = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    return db.collection('infos').doc('users').update(
      'counter', admin.firestore.FieldValue.increment(1)
    )
  })
exports.decrementUserCount = functions.firestore
  .document('users/{userID}')
  .onDelete((snap, context) => {
    return db.collection('infos').doc('users').update(
      'counter', admin.firestore.FieldValue.increment(-1)
    )
  })

db.collection('infos').doc('reqLogs').get()
  .then(s => {
    if (!s.exists) db.collection('infos').doc('reqLogs').set({ counter: 0 })
  })
exports.incrementReqLogsCount = functions.firestore
  .document('reqLogs/{id}')
  .onCreate((snap, context) => {
    return db.collection('infos').doc('reqLogs').update(
      'counter', admin.firestore.FieldValue.increment(1)
    )
  })
exports.decrementReqLogsCount = functions.firestore
  .document('reqLogs/{id}')
  .onDelete((snap, context) => {
    return db.collection('infos').doc('reqLogs').update(
      'counter', admin.firestore.FieldValue.increment(-1)
    )
  })

db.collection('infos').doc('pageLogs').get()
  .then(s => {
    if (!s.exists) db.collection('infos').doc('pageLogs').set({ counter: 0 })
  })
exports.incrementPageLogsCount = functions.firestore
  .document('pageLogs/{id}')
  .onCreate((snap, context) => {
    return db.collection('infos').doc('pageLogs').update(
      'counter', admin.firestore.FieldValue.increment(1)
    )
  })
exports.decrementPageLogsCount = functions.firestore
  .document('pageLogs/{id}')
  .onDelete((snap, context) => {
    return db.collection('infos').doc('pageLogs').update(
      'counter', admin.firestore.FieldValue.increment(-1)
    )
  })
