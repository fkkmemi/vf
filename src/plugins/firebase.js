import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'

// Add the Firebase products that you want to use
// import 'firebase/auth'
import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCmZZ-7S3eO6bj8rbkEeighFTtkVFovslw',
//   authDomain: 'test-vf-1.firebaseapp.com',
//   databaseURL: 'https://test-vf-1.firebaseio.com',
//   projectId: 'test-vf-1',
//   storageBucket: '',
//   messagingSenderId: '525800810555',
//   appId: '1:525800810555:web:59d29aee0055fda5'
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.firestore().collection('test').add({ test: 'aaa' })
  .then(r => console.log(r))
  .catch(e => console.error(e))
