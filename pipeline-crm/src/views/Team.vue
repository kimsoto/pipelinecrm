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
                <input type="text" class="form-control" placeholder="New Team Name" id="name">
              </div>
            </form>
            <div class="col-xs-12 col-md-4" :key="team" v-for="team of teams">
              <div class="accordion-grid">
              <figure @click="toggle" class="accordion autoclose" aria-controls="accordion0content" role="button">
              <figcaption>
                  <p>{{ team.name }}</p>
              </figcaption>
              </figure>
              <div class="accordion-content padding-15 padding-top-0 border-radius-10 margin-top-15" role="region" v-show="hideGrid">
                  <h3>Team information</h3>
              <div class="clients">
                  <h4>Clients</h4>
              <ul class="list-group">
              <li class="list-group-item list-group-item-action mb-1"><a href="#">client 1</a></li>
              <li class="list-group-item list-group-item-action mb-1"><a href="#">client 2</a></li>
              <li class="list-group-item list-group-item-action mb-1"><a href="#">client 3</a></li>
              </ul>
              </div>
              <div class="pipelines">
                  <h4>Pipelines</h4>
              <ul class="list-group">
              <li class="list-group-item list-group-item-action mb-1"><a href="#">pipeline 1</a></li>
              <li class="list-group-item list-group-item-action mb-1"><a href="#">pipeline 2</a></li>
              <li class="list-group-item list-group-item-action mb-1"><a href="#">pipeline 3</a></li>
              </ul>
              </div>
              <div class="members">
                  <h4>Members</h4>
              <ul class="list-group">
              <li class="list-group-item list-group-item-action mb-1"><a href="#">member name</a></li>
              <li class="list-group-item list-group-item-action mb-1"><a href="#">member name</a></li>
              <li class="list-group-item list-group-item-action mb-1"><a href="#">member name</a></li>
              </ul>
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
  name: 'Team',
  components: {
      SideMenu
  },
  data() {
    return {
      teams: [],
      hideGrid: false,
      showForm: false
    }
  },
  methods: {
    toggle() {
      this.hideGrid = !this.hideGrid
    },
    addForm() {
      this.showForm = true
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
        })
    }
  },
  mounted() {
    axios
      .get('/api/team/')
      .then(response => {
          let data = response.data
          this.teams = data
      })
  }
}
</script>

<style scoped>
.accordion-grid figure {
  padding: 50px 40px;
  background-color: white;
}
.accordion-grid figure figcaption {
  text-align: center;
  font-size: 18px;
}
.accordion-grid .accordion-content {
  padding: 25px;
  background-color: white;
}
.accordion-grid .accordion-content div {
  border: 1px solid #cccccc;
  margin: 15px 0px;
  padding: 15px;
}
.accordion-grid .accordion-content h3 {
  font-size: 22px;
}
.accordion-grid .accordion-content h4 {
  font-size: 18px;
}
ul li {
  border-radius: 0!important;
}
.hide {
  display: hidden;
}
</style>
