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
              <h2>Pipelines</h2>
            </header>
            <p>{{this.pipelines}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
const axios = require('axios')

export default {
  name: 'Pipeline',
  components: {
      SideMenu
  },
  data() {
    return {
      pipelines: [],
    }
  },
  methods: {

  },
  mounted() {
    axios
      .get('/api/pipeline/')
      .then(response => {
          this.pipelines = response.data.name
      })
  },
}
</script>
