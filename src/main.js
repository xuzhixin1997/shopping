import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store, 
  FastClick, 
  render: h => h(App),
}).$mount('#app')
