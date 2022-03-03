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
  <div id="pipelineAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(pipelines.length / 3)">
      <PipelineFigure :key="pipeline.pipeline_id" :pipeline="pipeline" v-for="pipeline in pipelines.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <PipelineAccordion :key="pipeline.pipeline_id" :pipeline="pipeline" v-for="pipeline in pipelines.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
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
</style>
