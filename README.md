# vf

Vue & Firebase lecture

# setup

## dependecies install

```bash
$ yarn
```

## firebase init

```bash
$ sudo npm i firebase-tools -g 
$ firebase login
$ firebase init hosting
# select your project
? Select a default Firebase project for this directory: your-project
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? No
```

## firebase deploy

```bash
$ yarn firebase:deploy
```

## firebase config file

**./firebaseConfig.js**  
```javascript
export default {
  apiKey: '...',
  authDomain: 'x.firebaseapp.com',
  databaseURL: 'https://x.firebaseio.com',
  projectId: 'x',
  storageBucket: '',
  messagingSenderId: '111',
  appId: '12'
}
```

## firebase functions install

```bash
$ firebase init functions
```