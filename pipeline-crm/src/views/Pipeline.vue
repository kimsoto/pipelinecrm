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
            <div class="col-md-4 accordion-grid" :key="pipeline.pipeline_id" :pipeline="pipeline.pipeline_id" v-for="pipeline in pipelines.slice(3 * (rowIndex - 1), 3 * rowIndex)">
              <figure>
                <a :href="'#toggle' + pipeline.pipeline_id" data-bs-toggle="collapse" aria-expanded="false">{{pipeline.name}}</a>
                <p>{{pipeline.team_name}}</p>
              </figure>
            </div>
            <div :key="pipeline.pipeline_id" :pipelineAcc="pipeline.pipeline_id" data-bs-parent="#pipelineAccordion" v-for="pipeline in pipelines.slice(3 * (rowIndex - 1), 3 * rowIndex)" class="col-lg-12 overlay collapse in accordion-content" :id="'toggle' + pipeline.pipeline_id">
              <h3>Pipeline information</h3>
              <div class="items">
                <h4>Products</h4>
                <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 1</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 2</a></li>
                <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 3</a></li>
                </ul>
            </div>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
