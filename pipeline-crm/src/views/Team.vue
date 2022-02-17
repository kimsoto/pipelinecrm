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
            <button @click="addForm">Add</button>
            <form v-show="showForm">
              <div class="form-group">
                <input v-model="name" type="text" class="form-control" placeholder="New Team Name" id="name">
                <input type="submit" :disabled="!name" @click="createTeam">
              </div>
            </form>
            <TeamAccordion :key="team" :team="team" v-for="team of teams" />
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
      teams: [],
      showForm: false,
      name: ''
    }
  },
  methods: {
    addForm() {
      this.showForm = !this.showForm
    },
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
            // this.teams.push(response.data)
        })
      this.showForm = false
    }
  },
  mounted() {
    axios
      .get('/api/team/')
      .then(response => {
          let data = response.data
          this.teams = data
      })
  },
  computed: {
    
  }
}
</script>

<style scoped>

</style>
