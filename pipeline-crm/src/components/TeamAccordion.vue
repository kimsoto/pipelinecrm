<template>
<div class="col-lg-4 col-md-6 col-sm-12">
  <div class="accordion-grid">
      <figure>
      <a :href="'#toggle' + team.team_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + team.team_id">{{ team.name }}</a>
      </figure>
      </div>
    <div class="accordion-content collapse overlay in col-xs-12" role="region" data-bs-parent="#teamAccordion" :id="'toggle' + team.team_id">
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
          <ul class="list-group" :key="pipeline" v-for="pipeline of pipelines">
            <li class="list-group-item list-group-item-action mb-1">
              <p>{{ pipeline.name }}</p>
            </li>
          </ul>
        </div>
        <div class="members">
          <h4>Members</h4>
          <ul class="list-group" :key="member" v-for="member of members">
            <li class="list-group-item list-group-item-action mb-1">
              <p>{{ member.name }}</p>
            </li>
          </ul>
        </div>
      </div>
</div>
</template>

<script>
const axios = require('axios')

export default {
    name: 'TeamAccordion',
    data() {
        return {
            hideGrid: false,
            members: [],
            pipelines: []
        }
    },
    props: ['team'],
    methods: {
        toggle() {
            this.hideGrid = !this.hideGrid
        }
    },
    mounted() {
      Promise.all(axios.get(`/api/member/${this.team.team_id}/All`), axios.get(`/api/pipeline/${this.team.team_id}/All`))
        .then(results => {
          this.members = results[0].data
          this.pipelines = results[1].data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.accordion-grid figure {
  background-color: white;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.accordion-grid a{
  color: #000;
  text-decoration: none;
  text-align: center;
  font-size: 24px;
}

.accordion-content {
  padding: 25px;
  background-color: white;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}
.accordion-content div {
  border: 1px solid #cccccc;
  margin: 15px 0px;
  padding: 15px;
}
.accordion-content h3 {
  font-size: 22px;
}
.accordion-content h4 {
  font-size: 18px;
}
ul li {
  border-radius: 0!important;
}

.list-group-item p {
  margin: 0!important;
}
</style>
