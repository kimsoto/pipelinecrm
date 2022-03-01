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
<div class="container">
    <div id="acc">
        <div class="row panel">
            <div class="col-md-4 accordion-grid" :key="pipeline" :pipeline="pipeline.pipeline_id" v-for="pipeline of pipelines">
              <figure>
                <a :href="'#toggle' + pipeline.pipeline_id" data-bs-toggle="collapse" aria-expanded="false" data-bs-parent="#acc">{{pipeline.name}}</a>
                <p>{{pipeline.team_name}}</p>
              </figure>
            </div>
            <div :key="pipeline" :pipelineAcc="pipeline.pipeline_id" v-for="pipeline in pipelines" class="col-lg-12 overlay collapse in" :id="'toggle' + pipeline.pipeline_id">
              <p>I am a hidden div ready for pipeline content :3</p>
            </div>
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
          this.pipelines = response.data
      })
  }
}
</script>

<style scoped>
.accordion-grid figure {
  background-color: white;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.accordion-grid a{
  color: #000;
  text-decoration: none;
  text-align: center;
  font-size: 24px;
}
</style>
