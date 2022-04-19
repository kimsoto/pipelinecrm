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
              <h2>Clients</h2>
              </div>
              <div class="user dropdown">
              <a href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" class="btn user-btn dropdown-toggle"><i class="fa-solid fa-user me-1"></i>{{ firstName }} {{ lastName }}</a>
              <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
              </ul>
              </div>
            </header>
            <div class="container mb-4 mt-0">
            <button type="button" class="btn btn-dark" @click="addForm">Add Client <i class="fa-solid fa-square-plus"></i></button>
            <form class="create-form mt-4 p-3" @submit.prevent="createClient" v-show="showForm">
                <h3 class="fs-4 mb-2">New Client</h3>
                <div class="form-group mb-3">
                <label for="name">Client Name:</label>
                <input maxlength="64" v-model="name" type="text" class="form-control" placeholder="Client Name" id="name">
                </div>
                <div class="form-group mb-3">
                <label for="status">Client Status:</label>
                <select v-model="statusSelect" name="statusSelect" id="statusSelect" class="form-select">
                  <option :value="status.status_id" :key="'status' + status.status_id" v-for="status in clientStatus" >{{ status.code }}</option>
                </select>
                </div>
                <input class="btn btn-dark mt-3" type="submit" :disabled="!name">
                <p class="text-danger fs-5 mt-3" v-show="dupeClient">Please enter a unique client name!</p>
            </form>
            </div>
<div class="container">
  <div class="accordion" id="clientAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(clients.length / 3)">
      <ClientFigure :key="'clientFig' + client.client_id" :client="client" v-for="client of clients.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <ClientAccordion :key="'clientAcc' + client.client_id" :client="client" v-for="client of clients.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
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
import ClientFigure from '../components/ClientFigure.vue'
import ClientAccordion from '../components/ClientAccordion.vue'
const axios = require('axios')

/**
 * This is the Client page component
 * 
 * It holds the Client cards and the Client detail card components
 * This component also has the Create New Client form that calls the Create Client API call
 * Once the component is loaded it will call the List Clients and List Client Status API calls
 */
export default {
  name: 'Client',
  components: {
      SideMenu,
      ClientFigure,
      ClientAccordion
  },
  data() {
    return {
      clients: [],
      clientStatus: [],
      showForm: false,
      name: '',
      statusSelect: 1,
      dupeClient: false,
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
     * Method that toggles the Create New Client form
     */
    addForm() {
      this.showForm = !this.showForm
    },
    /**
     * Method that calls the List Clients API call
     */
    getClient() {
      let config = {
      method: 'get',
      // url: '/api/client/',
      url: 'http://localhost:3000/api/client/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
      }
    }
      axios(config)
      .then(response => {
        this.clients = response.data
      })
    },
    /**
     * Method that grabs the Create New Client form input to call the Create API call
     * 
     * After the api is called, it hides the Create New Client form and resets the form name input,
     * resets the dupeClient variable, and calls getClient()
     */
    createClient() {
      let newClient = { status_id: this.statusSelect, name: this.name }
      let config = {
        method: 'post',
        // url: 'http://localhost:3000/api/client/',
        url: '/api/client/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('vue-token')
        },
        data: newClient
      }
      axios(config)
        .then(response => {
          this.clients.push(response.data)
          this.showForm = false
          this.dupeClient = false
          this.getClient()
          this.name = ''
      })
      .catch((error) => {
          if(error.response){
            this.dupeClient = true
          }
      })
    }
  },
  mounted() {
    // let getClients = '/api/client/'
    // let getClientStatus = '/api/statusCompletion/clientStatus'
    let getClients = 'http://localhost:3000/api/client/'
    let getClientStatus = 'http://localhost:3000/api/statusCompletion/clientStatus'
    const promiseClients = axios.get(getClients, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})
    const promiseClientStatus = axios.get(getClientStatus, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
    }})

    Promise.all([promiseClients, promiseClientStatus])
    .then(results => {
        this.clients = results[0].data
        this.clientStatus = results[1].data
    })
  }
}
</script>