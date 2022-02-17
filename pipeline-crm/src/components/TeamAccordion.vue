<template>
<div class="col-xs-12 col-md-4">
    <div class="accordion-grid">
              <figure @click="toggle" class="accordion autoclose" aria-controls="accordion0content" role="button">
              <figcaption>
                  <p>{{ team.name }}</p>
              </figcaption>
              </figure>
              <div class="accordion-content padding-15 padding-top-0 border-radius-10 margin-top-15" role="region" v-show="hideGrid">
                <button type="button" class="btn"  @click="addEdit">Edit Team</button>
            <form v-show="showEdit">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="New Team Name" :id="team.team_id">
                <input type="submit" class="btn"  @click="editTeam(team.team_id)">
              </div>
            </form>
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
              <button @click="deleteTeam(team.team_id)">Delete Team</button>
              </div>
              </div>
</div>
</template>

<script>
const axios = require('axios')
import Team from '../views/Team.vue'

export default {
    name: 'TeamAccordion',
    data() {
        return {
            hideGrid: false,
            showEdit: false
        }
    },
    props: ['team'],
    methods: {
        toggle() {
            this.hideGrid = !this.hideGrid
        },
        addEdit() {
          this.showEdit = !this.showEdit
        },
        editTeam(teamid) {
        let newTeamName = document.getElementById(`${teamid}`).value
        console.log(newTeamName)
        let newTeam = { name: newTeamName }
        let config = {
            method: 'put',
            url: `/api/team/${teamid}`,
            data: newTeam
          }
        axios(config)
          .then(response => {
              console.log(response.data)
              console.log(Team.data.teams)
          })
        this.showEdit = false
      },
      deleteTeam(teamid) {
        let config = {
            method: 'delete',
            url: `/api/team/${teamid}`
          }
        axios(config)
          .then(response => {
              console.log(response)
          })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
