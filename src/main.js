import Vue from 'vue'
import App from './App.vue'

// Defina false para prevenir a exibição da dica sobre o modo de produção ao iniciar o Vue
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')