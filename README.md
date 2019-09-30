# vf

Vue & Firebase lecture default source

# Setup guide

## Download

Download the source to your desired location

```bash
$ git clone https://github.com/fkkmemi/vf test
$ cd test
```

## Dependecies install

Dependencies installation

```bash
$ yarn # front-end install
$ cd functions && yarn # back-end install
$ cd ..
```
## Web customize

Change to whatever name you like

**public/index.html**
```html
<title>This is my web</title>
```

**package.json**
```json
{
  "name": "my-web",
  "description": "my web"
}
```

## Firebase console setting

site connect

https://console.firebase.google.com

### project add

![alt new project](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;10.52.27.png)

![alt anal](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;10.52.33.png)

![alt prog](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;10.52.51.png)

![alt fin](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;10.53.03.png)

### Authentication

Activation of authentication

**email enable**  
![alt email](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.07.36.png)

**google enable**  
![alt google](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.07.58.png)

### Database

Activation of database

**firestore**  
![alt firestore](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.08.15.png)

![alt firestore](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.08.35.png)

### Storage

Activation of storage

![alt storage](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.09.24.png)

### Project settings

![alt setting 1](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.10.19.png)

![alt setting 2](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.11.01.png)

#### copy firebaseConfig

![alt setting 2](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.11.31.png)

firebaseConfig file make

**./firebaseConfig.js**  
```javascript
export default {
  apiKey: 'AIzaSyBLUOZIpmKBO9ImYk_FrFa1IHr6u_VygOM',
  authDomain: 'new-project-f36b8.firebaseapp.com',
  databaseURL: 'https://new-project-f36b8.firebaseio.com',
  projectId: 'new-project-f36b8',
  storageBucket: 'new-project-f36b8.appspot.com',
  messagingSenderId: '556943987787',
  appId: '1:556943987787:web:76773c1159b3cac930a9ce'
}
```

#### make key

![alt key](/public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.32.58.png)

**copy key.json**  

new-project-f36b8-e568f7f61e3c.json -> /functions/key.json

### Firebase upgrade

Spark plan is too restrictive and is hard to use

spark -> blaze

![alt up](/public/images/스크린샷&#32;2019-09-29&#32;오전&#32;2.55.53.png)

![alt up](/public/images/스크린샷&#32;2019-09-29&#32;오전&#32;2.56.16.png)

## firebase use

```bash
$ sudo npm i firebase-tools -g # If you don't have firebase-tools
$ firebase login # If you are not logged in
$ firebase use --add
? Which project do you want to add? 
❯ new-project-f36b8 
? What alias do you want to use for this project? (e.g. staging) default

Created alias default for new-project-f36b8.
Now using alias default (new-project-f36b8)
```

## Firebase functions setting

### admin setting

Admin Email Settings

```bash
$ cd functions
$ firebase functions:config:set admin.email=abcd@xxx.com
```

### runtimeconfig.json

Runtime file generation

```bash
$ cd functions
$ firebase functions:config:get>.runtimeconfig.json
```

## git

### create 

site connect

https://github.com

![alt git make](public/images/스크린샷&#32;2019-09-28&#32;오후&#32;11.45.53.png)

### remove .git

.git file remove

```bash
$ rm -rf .git # mac or linux
```

### git push

push your repository

```bash
$ git init
$ git commit -m "first commit"
$ git add .
$ git remote add origin https://github.com/user/xxx.git
$ git push -u origin master
```

# local test

## functions

```bash
$ yarn serve:be
```

## web

```bash
$ yarn serve
```

# deploy

## full

```bash
$ yarn deploy
```

## functions

```bash
$ yarn deploy:be
```

## web

```bash
$ yarn deploy:fe
```

# view

## sign

![alt sign](public/images/스크린샷&#32;2019-09-30&#32;오후&#32;3.41.36.png)

## main

![alt main](public/images/스크린샷&#32;2019-09-30&#32;오후&#32;3.40.47.png)
