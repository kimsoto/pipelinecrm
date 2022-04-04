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
              <h2>Pipelines</h2>
              </div>
              <div class="user dropdown">
              <a href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" class="btn user-btn dropdown-toggle"><i class="fa-solid fa-user me-1"></i>{{ firstName }} {{ lastName }}</a>
              <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
              </ul>
              </div>
            </header>
<div class="container">
  <div id="pipelineAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(pipelines.length / 3)">
      <PipelineFigure :key="'pipelineFig' + pipeline.pipeline_id" :pipeline="pipeline" v-for="pipeline in pipelines.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <PipelineAccordion :key="'pipelineAcc' + pipeline.pipeline_id" :pipeline="pipeline" v-for="pipeline in pipelines.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
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
import Vue from 'vue'
import SideMenu from '../components/SideMenu.vue'
import PipelineFigure from '../components/PipelineFigure.vue'
import PipelineAccordion from '../components/PipelineAccordion.vue'
const axios = require('axios')

export default {
  name: 'Pipeline',
  components: {
      SideMenu,
      PipelineFigure,
      PipelineAccordion
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
  methods: {
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    },
  },
  mounted() {
    let config = {
      method: 'get',
      // url: '/api/pipeline/',
      url: 'http://localhost:3000/api/pipeline/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
      }
    }

    axios(config)
    .then(response => {
      this.pipelines = response.data
    })
  }
}
</script>

<style scoped>
</style>
