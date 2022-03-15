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
              <h2>Teams</h2>
            </header>
<div class="container">
  <div class="accordion" id="clientAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(clients.length / 3)">
      <ClientFigure :key="client.client_id" :client="client" v-for="client of clients.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <ClientAccordion :key="client.client_id" :client="client" v-for="client of clients.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
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
      clients: []
    }
  },
  methods: {
    createClient() {
      let clientName = document.querySelector('#name').value
      let newClient = { name: clientName }
      let config = {
          method: 'post',
          url: '/api/client/',
          data: newClient
        }
      axios(config)
        .then(response => {
            console.log(response)
            this.clients.push(response.data)
            // location.reload()
      })
    }
  },
  mounted() {
    axios
      // .get('/api/client/')
      .get('http://localhost:3000/api/client/')
      .then(response => {
        this.clients = response.data
      })
  }
}
</script>
