import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Client from '../views/Client.vue'
import Contact from '../views/Contact.vue'
import Item from '../views/Item.vue'
import Pipeline from '../views/Pipeline.vue'
import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Client/:id?',
    name: 'Client',
    component: Client
  },
  {
    path: '/Contact/:id?',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/Item/:id?',
    name: 'Item',
    component: Item
  },
  {
    path: '/Pipeline/:id?',
    name: 'Pipeline',
    component: Pipeline
  },
  {
    path: '/Team/:id?',
    name: 'Team',
    component: Team
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
