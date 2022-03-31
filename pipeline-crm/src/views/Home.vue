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
              <div class="headings">
              <h1>Pipeline CRM</h1>
              </div>
              <div class="user dropdown">
              <a href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" class="btn user-btn dropdown-toggle"><i class="fa-solid fa-user me-1"></i>{{ firstName }} {{ lastName }}</a>
              <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
              </ul>
              </div>
            </header>
            <div class="container">
            <div class="row">
              <HomePipe class="col-12 col-md-6 col-lg-4" :key="'homePipeline' + pipeline.pipeline_id" :pipeline="pipeline" v-for="pipeline in pipelines" />
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
import Vue from 'vue'
import SideMenu from '../components/SideMenu.vue'
import HomePipe from '../components/HomePipe.vue'
const axios = require('axios')

export default {
  name: 'Home',
  components: {
    SideMenu,
    HomePipe
  },
  data() {
    return {
      pipelines: [],
      firstName: '',
      lastName: ''
    }
  },
  beforeMount() {
    this.firstName = Vue.$keycloak.tokenParsed.given_name
    this.lastName = Vue.$keycloak.tokenParsed.family_name
  },
  mounted() {
    axios
      // .get('/api/pipeline/')
      .get('http://localhost:3000/api/pipeline/')
      .then(response => {
        console.log(response.data)
        this.pipelines = response.data
      })
  },
  methods: {
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    }
  }
}
</script>

<style scoped>

</style>