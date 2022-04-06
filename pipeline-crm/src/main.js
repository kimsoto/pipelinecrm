import Vue from 'vue'
import App from './App.vue'
import router from './router'
import authentication from "@/plugins/authentication"

Vue.config.productionTip = false
Vue.use(authentication)

Vue.$keycloak
  .init({ onLoad: 'login-required', checkLoginIframe: false }).then(() => {
    localStorage.setItem("vue-token", Vue.$keycloak.token)
    localStorage.setItem("vue-refresh-token", Vue.$keycloak.refreshToken)
  })
  .then(() => {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
