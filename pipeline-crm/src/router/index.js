import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Client from '../views/Client.vue'
import Contact from '../views/Contact.vue'
import Invoice from '../views/Invoice.vue'
import Item from '../views/Item.vue'
import Pipeline from '../views/Pipeline.vue'
import Product from '../views/Product.vue'
import Receipt from '../views/Receipt.vue'
import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Client',
    name: 'Client',
    component: Client
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/Invoice',
    name: 'Invoice',
    component: Invoice
  },
  {
    path: '/Item',
    name: 'Item',
    component: Item
  },
  {
    path: '/Pipeline',
    name: 'Pipeline',
    component: Pipeline
  },
  {
    path: '/Product',
    name: 'Product',
    component: Product
  },
  {
    path: '/Receipt',
    name: 'Receipt',
    component: Receipt
  },
  {
    path: '/Team',
    name: 'Team',
    component: Team
  },
]

const router = new VueRouter({
  routes
})

export default router
