import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const pageLogWrite = (to) => {
  const { uid, email } = store.state.user
  Vue.prototype.$firebase.firestore().collection('pageLogs').add({
    uid,
    email,
    to: to.path,
    createdAt: new Date()
  }).catch((e) => console.log(e.message))
}

const levelCheck = (level) => {
  return (to, from, next) => {
    if (!store.state.user) {
      if (to.path !== '/sign') {
        Vue.prototype.$toasted.global.error('로그인이 필요합니다')
        return next('/sign')
      }
    } else {
      const msg = [
        '관리자 이상만 들어갈 수 있습니다',
        '사용자 이상만 들어갈 수 있습니다',
        '손님 이상만 들어갈 수 있습니다'
      ]
      if (store.state.claims.level > level) throw Error(msg[level])
      pageLogWrite(to)
    }
    next()
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: levelCheck(1)
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('./views/sign.vue'),
      beforeEnter: (to, from, next) => {
        if (store.state.user) return next('/')
        next()
      }
    },
    {
      path: '/admin/users',
      component: () => import('./views/admin/users'),
      beforeEnter: levelCheck(0)
    },
    {
      path: '/test/lv0',
      component: () => import('./views/test/lv0.vue'),
      beforeEnter: levelCheck(0)
    },
    {
      path: '/test/lv1',
      component: () => import('./views/test/lv1.vue'),
      beforeEnter: levelCheck(1)
    },
    {
      path: '/test/lv2',
      component: () => import('./views/test/lv2.vue'),
      beforeEnter: levelCheck(2)
    },
    {
      path: '/userProfile',
      component: () => import('./views/userProfile.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next('/sign')
        pageLogWrite(to)
        next()
      }
    },
    {
      path: '*',
      component: () => import('./views/e404.vue')
    }
  ]
})

const waitFirebase = () => {
  return new Promise((resolve, reject) => {
    let cnt = 0
    const tmr = setInterval(() => {
      if (store.state.firebaseLoaded) {
        clearInterval(tmr)
        resolve()
      } else if (cnt++ > 500) reject(Error('제한 시간 초과, 인터넷 연결을 확인하세요'))
    }, 10)
  })
}

router.beforeEach((to, from, next) => {
  Vue.prototype.$Progress.start()
  waitFirebase()
    .then(() => next())
    .catch(e => Vue.prototype.$toasted.global.error(e.message))
})

router.afterEach((to, from) => {
  Vue.prototype.$Progress.finish()
})

router.onError(e => {
  Vue.prototype.$Progress.finish()
  Vue.prototype.$toasted.global.error(e.message)
})

export default router
