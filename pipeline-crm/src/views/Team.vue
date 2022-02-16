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
          </div>
          <div class="row">
            <TeamAccordion></TeamAccordion>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import TeamAccordion from '../components/TeamAccordion.vue'
const axios = require('axios')

export default {
  name: 'Team',
  components: {
      SideMenu,
      TeamAccordion
  },
  data() {
    return {
      teams: []
    }
  },
  mounted() {
    axios
      .get('/api/team/')
      .then(response => {
          let data = response.data
          this.teams = data
          for(team in this.teams){
            console.log(team.name)
          }
          console.log(this.teams)
      })
  }
}
</script>

<style scoped>

</style>
