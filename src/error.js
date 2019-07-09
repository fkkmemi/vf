import Vue from 'vue'

Vue.config.errorHandler = e => {
  // console.log('here')
  // console.error(e.message)
  Vue.prototype.$toasted.global.error(e.message)
}
