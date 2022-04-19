/**
 * Js file that connects the realm id and client id from Keycloak 
 * and connects it to Vue
 * 
 * Used in main.js when initializing Vue
 */
import Vue from 'vue'
import Keycloak from 'keycloak-js'

const options = {
  url: 'http://localhost:8001',
  // url: 'https://crm.alpinedatasolutions.com/auth/',
  realm: 'ads',
  clientId: 'crmclient'
}

const _keycloak = Keycloak(options)

const Plugin = {
  install(Vue) {
    Vue.$keycloak = _keycloak
  }
}

Plugin.install = Vue => {
  Vue.$keycloak = _keycloak
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return _keycloak
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin