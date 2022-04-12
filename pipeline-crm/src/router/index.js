import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Client from '../views/Client.vue'
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
  routes
})

export default router
