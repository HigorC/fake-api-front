import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Buefy from 'buefy'

// CSS
import './styles/main.scss'

Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
