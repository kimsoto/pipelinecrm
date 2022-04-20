<template>
  <div id="app">
      <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-grey">
          <SideMenu></SideMenu>
        </div>
        <div class="col pb-3 header-div">
          <div class="row">
            <header>
              <div class="headings">
              <h1>Pipeline CRM</h1>
              <h2>Teams</h2>
              </div>
              <div class="user dropdown">
              <a href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" class="btn user-btn dropdown-toggle"><i class="fa-solid fa-user me-1"></i>{{ firstName }} {{ lastName }}</a>
              <ul class="dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
              </ul>
              </div>
            </header>
<div class="container">
  <div class="accordion" id="teamAccordion">
    <div class="row panel" :key="rowIndex" v-for="rowIndex in Math.ceil(teams.length / 3)">
      <TeamFigure :key="'teamFig' + team.team_id" :team="team" v-for="team of teams.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
      <TeamAccordion :key="'teamAcc' + team.team_id" :team="team" v-for="team of teams.slice(3 * (rowIndex - 1), 3 * rowIndex)" />
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
import TeamFigure from '../components/TeamFigure.vue'
import TeamAccordion from '../components/TeamAccordion.vue'
const axios = require('axios')

/**
 * This is the Team page component
 * It holds the Team cards and the Team detail card components
 * Once the component is loaded it will call the List Teams API calls
 */
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
      firstName: '',
      lastName: ''
    }
  },
  beforeMount() {
    this.firstName = Vue.$keycloak.tokenParsed.given_name
    this.lastName = Vue.$keycloak.tokenParsed.family_name
  },
  methods: {
    /**
     * Logout method used in the Header of the page to redirect back to Keycloak login
     */
    logout () {
      Vue.$keycloak.logout({ redirectUri: window.location.origin })
    },
  },
  mounted() {
    let config = {
      method: 'get',
      url: '/api/team/',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('vue-token')
      }
    }
    
    axios(config)
    .then(response => {
      this.teams = response.data
    })
  }
}
</script>
