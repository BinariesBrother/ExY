import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'
import SidePlayer from './SidePlayer'

Vue.use(VueMaterial)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// IF MAIN PAGE
if ( document.querySelector('#app') ) {
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    template: '<App/>'
  }).$mount('#app')
}

if ( document.querySelector('#side_player') ) {
  new Vue({
    components: {SidePlayer},
    template: '<SidePlayer/>'
  }).$mount('#side_player')
}
