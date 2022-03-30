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
      pipelines: []
    }
  },
  mounted() {
    axios
      .get('/api/pipeline/')
      // .get('http://localhost:3000/api/pipeline/')
      .then(response => {
        console.log(response.data)
        this.pipelines = response.data
      })
  }
}
</script>

<style scoped>

</style>