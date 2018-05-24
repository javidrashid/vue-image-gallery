import Vue from 'vue'
import App from './App.vue'
import VueToastr from '@deveodk/vue-toastr'
import VuePaginate from 'vue-paginate'


import Lightbox from 'vue-pure-lightbox'
Vue.use(Lightbox)
Vue.use(VuePaginate)  


Vue.use(VueToastr, {
  defaultPosition: 'toast-top-right',
  defaultType: 'info',
  defaultTimeout: 3000
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
