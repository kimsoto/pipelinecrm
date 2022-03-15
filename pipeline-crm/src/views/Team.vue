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
  <div class="accordion" id="teamAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(teams.length / 3)">
      <TeamFigure :key="team.team_id" :team="team" v-for="team of teams.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <TeamAccordion :key="team.team_id" :team="team" v-for="team of teams.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
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
import TeamFigure from '../components/TeamFigure.vue'
import TeamAccordion from '../components/TeamAccordion.vue'
const axios = require('axios')

export default {
  name: 'Team',
  components: {
      SideMenu,
      TeamFigure,
      TeamAccordion
  },
  data() {
    return {
      teams: [],
    }
  },
  methods: {
    createTeam() {
      let teamName = document.querySelector('#name').value
      let newTeam = { name: teamName }
      let config = {
          method: 'post',
          url: '/api/team/',
          data: newTeam
        }
      axios(config)
        .then(response => {
            console.log(response)
            this.teams.push(response.data)
            // location.reload()
        })
    }
  },
  mounted() {
    axios
      // .get('/api/team/')
      .get('http://localhost:3000/api/team/')
      .then(response => {
        this.teams = response.data
      })
  }
}
</script>

<style scoped>

</style>
