import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  iconPack: 'mdi'
})

Vue.toasted.register('error', (payload) => {
  return payload
}, {
  icon: 'mdi-alert',
  position: 'bottom-right',
  duration: 5000,
  className: 'subheading',
  action: {
    text: '닫기',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})
