import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import store from '../store'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// firebase.firestore().collection('test').add({ test: 'aaa' })
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged((user) => {
  console.log('here?')
  console.log(user)
  // store.commit('setUser', user)
  store.dispatch('getUser', user)
})
