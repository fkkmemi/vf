import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const levelCheck = (to, from, next) => {
  if (store.state.claims.level === undefined) return next('/userProfile')
  next()
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: levelCheck
      // beforeEnter: (to, from, next) => {
      //   // next()
      //   if (store.state.claims.level === undefined) return next('/userProfile')
      //   next()
      // }
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('./views/sign.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/about2',
      component: () => import('./views/About2.vue')
    },
    {
      path: '/userProfile',
      component: () => import('./views/userProfile.vue')
    },
    {
      path: '/lectures/card',
      component: () => import('./views/lectures/card.vue')
    },
    {
      path: '/lectures/layout',
      component: () => import('./views/lectures/layout.vue')
    },
    {
      path: '/lectures/notes',
      component: () => import('./views/lectures/notes.vue')
    },
    {
      path: '/lectures/axios',
      component: () => import('./views/lectures/axios.vue')
    },
    {
      path: '/lectures/mother',
      component: () => import('./views/lectures/mother')
    },
    {
      path: '/lectures/vuex',
      component: () => import('./views/lectures/vuex')
    },
    {
      path: '*',
      component: () => import('./views/e404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  Vue.prototype.$Progress.start()
  if (store.state.firebaseLoaded) {
    next()
  }
})

router.afterEach((to, from) => {
  Vue.prototype.$Progress.finish()
})

export default router
