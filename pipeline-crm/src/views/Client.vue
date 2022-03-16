<template>
  <div id="app">
      <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-grey">
          <SideMenu></SideMenu>
        </div>
        <div class="col py-3">
          <div class="row">
            <header>
              <h1>Pipeline CRM</h1>
              <h2>Clients</h2>
            </header>
            <button @click="addForm">Add</button>
            <form @submit.prevent="createClient" v-show="showForm">
              <div class="form-group">
                <label for="name">Client Name:</label>
                <input v-model="name" type="text" class="form-control" placeholder="Client Name" id="name">
                <label for="status">Client Status:</label>
                <select v-model="statusSelect" name="statusSelect" id="statusSelect" class="form-select">
                  <option :value="status.status_id" :key="'status' + status.status_id" v-for="status in clientStatus" >{{ status.code }}</option>
                </select>
                <input type="submit" :disabled="!name">
                <p v-show="dupeClient">Please enter a unique client name!</p>
              </div>
            </form>
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
import SideMenu from '../components/SideMenu.vue'
import ClientFigure from '../components/ClientFigure.vue'
import ClientAccordion from '../components/ClientAccordion.vue'
const axios = require('axios')

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
      dupeClient: false
    }
  },
  methods: {
    addForm() {
      this.showForm = !this.showForm
    },
    getClient() {
      axios
      .get('/api/client/')
      // .get('http://localhost:3000/api/client/')
      .then(response => {
        this.clients = response.data
      })
    },
    createClient() {
      this.name = document.getElementById('name').value
      this.statusSelect = document.getElementById('statusSelect').value
      let newClient = { status_id: this.statusSelect, name: this.name }
      let config = {
        method: 'post',
        // url: 'http://localhost:3000/api/client/',
        url: '/api/client/',
        data: newClient
      }
      axios(config)
        .then(response => {
          console.log(response)
          this.clients.push(response.data)
          this.showForm = false
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
    let getClients = '/api/client/'
    let getClientStatus = '/api/statusCompletion/clientStatus'
    // let getClients = 'http://localhost:3000/api/client/'
    // let getClientStatus = 'http://localhost:3000/api/statusCompletion/clientStatus'
    const promiseClients = axios.get(getClients)
    const promiseClientStatus = axios.get(getClientStatus)

    Promise.all([promiseClients, promiseClientStatus])
    .then(results => {
        this.clients = results[0].data
        this.clientStatus = results[1].data
    })
  },
  computed: {

  }
}
</script>
