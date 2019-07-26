const functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp()

console.log(functions.config().admin.email)

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

exports.test = functions.https.onRequest(require('./test'))
exports.createUser = functions.auth.user().onCreate((user) => {
  let set = { level: 2 }
  if (functions.config().admin.email === user.email && user.emailVerified) set.level = 0
  admin.auth().setCustomUserClaims(user.uid, set).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
  })
})
