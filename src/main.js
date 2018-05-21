import Vue from 'vue'
import App from './App.vue'

import Lightbox from 'vue-pure-lightbox'
Vue.use(Lightbox)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
