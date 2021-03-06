<template>
  <div id="app">
      <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-grey">
          <SideMenu></SideMenu>
        </div>
        <div class="col pb-3 header-div">
          <div class="row">
            <header>
              <div class="headings">
              <h1>Pipeline CRM</h1>
              <h2>Items</h2>
              </div>
              <div class="user dropdown">
              <a href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" class="btn user-btn dropdown-toggle"><i class="fa-solid fa-user me-1"></i>{{ firstName }} {{ lastName }}</a>
              <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
              </ul>
              </div>
            </header>
            <div class="container mb-4 mt-0">
            <button type="button" class="btn btn-dark" @click="addForm">Add Item <i class="fa-solid" :class="iconClass"></i></button>
            <form class="create-form mt-4 p-3" @submit.prevent="createItem" v-show="showForm">
                <h3 class="fs-4 mb-2">New Item</h3>
                <div class="form-group mb-3">
                <label for="title">Item Title:</label>
                <input maxlength="64" required v-model="title" type="text" class="form-control" placeholder="Item Name" id="title">
                </div>
                <div class="form-group mb-3">
                <label for="statusSelect">Status:</label>
                <select v-model="statusSelect" name="statusSelect" id="statusSelect" class="form-select">
                  <option :value="status.status_id" :key="'status' + status.status_id" v-for="status in statuses" >{{ status.code }}</option>
                </select>
                </div>
                <div class="form-group mb-3">
                <label for="completionSelect">Completion:</label>
                <select v-model="completionSelect" name="completionSelect" id="completionSelect" class="form-select">
                  <option :value="completion.completion_id" :key="'completion' + completion.completion_id" v-for="completion in completions" >{{ completion.code }}</option>
                </select>
                </div>
                <div class="form-group mb-3">
                <label for="clientSelect">Client:</label>
                <select v-model="clientSelect" name="clientSelect" id="clientSelect" class="form-select">
                  <option :value="client.client_id" :key="'client' + client.client_id" v-for="client in clients" >{{ client.name }}</option>
                </select>
                </div>
                <div class="form-group mb-3">
                <label for="productSelect">Product:</label>
                <select v-model="productSelect" name="productSelect" id="productSelect" class="form-select">
                  <option :value="product.product_id" :key="'product' + product.product_id" v-for="product in products" >{{ product.name }}</option>
                </select>
                </div>
                <div class="form-group mb-3">
                <label for="contractedRev">Contracted Revenue:</label>
                <input maxlength="15" required type="text" pattern="\d{1,10}(?:\.\d{1,2})?$" v-model="contractedRev" class="form-control" placeholder="100.00" id="contractedRev">
                </div>
                <div class="form-group mb-3">
                <label for="plannedStart">Planned Start:</label>
                <DatePicker v-model="plannedStart" id="plannedStart" valueType="format"/>
                </div>
                <div class="form-group mb-3">
                <label for="plannedEnd">Planned End:</label>
                <DatePicker v-model="plannedEnd" id="plannedEnd" valueType="format"/>
                </div>
                <div class="form-group mb-3">
                <label for="actualStart">Actual Start:</label>
                <DatePicker v-model="actualStart" id="actualStart" valueType="format"/>
                </div>
                <div class="form-group mb-3">
                <label for="actualEnd">Actual End:</label>
                <DatePicker v-model="actualEnd" id="actualEnd" valueType="format"/>
                </div>
                <input class="btn btn-dark mt-3" type="submit" :disabled="!title || !contractedRev">
            </form>
            </div>
<div class="container">
  <div class="accordion" id="itemAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(items.length / 3)">
      <ItemFigure :key="'itemFig' + item.item_id" :item="item" v-for="item of items.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <ItemAccordion :key="'itemAcc' + item.item_id" :completions="completions" :statuses="statuses" :item="item" v-for="item of items.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import Vue from 'vue'
import SideMenu from '../components/SideMenu.vue'
import ItemFigure from '../components/ItemFigure.vue'
import ItemAccordion from '../components/ItemAccordion.vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
const axios = require('axios')

/**
 * This is the Item page component
 * 
 * It holds the Item cards and the Item detail card components
 * This component also has the Create New Item form that calls the Create Item API call
 * Once the component is loaded it will call the List Items, List Products,
 * List Status, and List Completion API calls
 */
export default {
  name: 'Item',
  components: {
      SideMenu,
      ItemFigure,
      ItemAccordion,
      DatePicker
  },
  data() {
    return {
      items: [],
      clients: [],
      products: [],
      statuses: [],
      completions: [],
      showForm: false,
      title: '',
      contractedRev: '',
      plannedStart: null,
      plannedEnd: null,
      actualStart: null,
      actualEnd: null,
      statusSelect: 1,
      completionSelect: 1,
      clientSelect: '',
      productSelect: '',
      firstName: '',
      lastName: ''
    }
  },
  beforeMount() {
    this.firstName = Vue.$keycloak.tokenParsed.given_name
    this.lastName = Vue.$keycloak.tokenParsed.family_name
  },
  methods: {
    /**
     * Logout method used in the Header of the page to redirect back to Keycloak login
     */
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    },
    /**
     * Method that toggles the Create New Item form
     */
    addForm() {
      this.showForm = !this.showForm
    },
    /**
     * Method that calls the List Items API call
     */
    getItems() {
      let config = {
        method: 'get',
        url: '/api/item/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('vue-token')
        }
      }

      axios(config)
      .then(response => {
        this.items = response.data
      })
    },
    /**
     * Method that grabs the Create New Item form input to call the Create Item API call
     * 
     * After the api is called, it hides the Create New Item form and resets the form inputs 
     * and calls getItems()
     */
    createItem() {
      let newItem = { completion_id: this.completionSelect, status_id: this.statusSelect, client_id: this.clientSelect, product_id: this.productSelect, title: this.title, contracted_rev: this.contractedRev, planned_start: this.plannedStart, planned_end: this.plannedEnd, actual_start: this.actualStart, actual_end: this.actualEnd }
      let config = {
        method: 'post',
        url: '/api/item/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('vue-token')
        },
        data: newItem
      }
      axios(config)
        .then(response => {
          console.log(response)
          this.showForm = false
          this.getItems()
          this.title = ''
          this.contractedRev = ''
          this.statusSelect = 1
          this.completionSelect = 1
          this.clientSelect = this.clients[0].client_id
          this.productSelect = this.products[0].product_id
          this.plannedStart = null
          this.plannedEnd = null
          this.actualStart = null
          this.actualEnd = null
      })
      .catch((error) => {
          if(error.response){
            console.log(error.response)
          }
      })
    }
  },
  mounted() {
    let getItems = '/api/item/'
    let getClients = '/api/client/'
    let getProducts = '/api/product/'
    let getStatus = '/api/statusCompletion/status'
    let getCompletion = '/api/statusCompletion/completion'
    const promiseItems = axios.get(getItems, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})
    const promiseClients = axios.get(getClients, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})
    const promiseProducts = axios.get(getProducts, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})
    const promiseStatus = axios.get(getStatus, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})
    const promiseCompletion = axios.get(getCompletion, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})

    Promise.all([promiseItems, promiseClients, promiseProducts, promiseStatus, promiseCompletion])
    .then(results => {
        this.items = results[0].data
        this.clients = results[1].data
        this.products = results[2].data
        this.statuses = results[3].data
        this.completions = results[4].data
        
        // used to grab the first id of each result to use as the default select value
        this.clientSelect = this.clients[0].client_id
        this.productSelect = this.products[0].product_id
    })
  },
  computed: {
    iconClass() {
        return {
          'fa-square-plus': this.showForm === false,
          'fa-square-minus': this.showForm === true
      }
    }
  }
}
</script>

<style scoped>
.mx-datepicker {
    display: block;
    width: 100%;
}
</style>
