import Vue from 'vue'
import App from './App.vue'


import VuePaginate from 'vue-paginate'


import Lightbox from 'vue-pure-lightbox'
Vue.use(Lightbox)
Vue.use(VuePaginate)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
