<template>
<div data-bs-parent="#teamAccordion" class="col-lg-12 overlay collapse in" :id="'toggle' + team.team_id">
<div class="accordion-content">
    <div class="row">
    <h3>Team information</h3>
        <div class="col-12 col-md-6">
            <div class="pipelines" v-if="pipelines.length > 0">
                <h4>Pipelines</h4>
                <ul class="list-group" :key="pipeline.pipeline_id" v-for="pipeline of pipelines">
                <li class="list-group-item list-group-item-action mb-1">
                    <a :href="'#/Pipeline/#toggle' + pipeline.pipeline_id"><p>{{ pipeline.name }}</p></a>
                </li>
                </ul>
            </div>
            <div class="pipelines" v-else>
                <h4>Pipelines</h4>
                <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>No pipelines have been assigned to this team.</p>
                </li>
                </ul>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="members" v-if="members.length > 0">
                <h4>Members</h4>
                <ul class="list-group" :key="member.member_id" v-for="member of members">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>{{ member.name }}</p>
                </li>
                </ul>
            </div>
            <div class="members" v-else>
                <h4>Members</h4>
                <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>No members have been assigned to this team.</p>
                </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
const axios = require('axios')

/**
 * This is the Team detail accordion
 * 
 * It shows the the Pipelines's and Members assigned to the Team.
 * If no Pipelines's or Members are assigned to the Team, 
 * it will show a message stating that no pipelines and members have been assigned.
 * Once the component is loaded it will call the List Team Pipelines and List Members API calls
 */
export default {
    name: 'TeamAccordion',
    data() {
        return {
            members: [],
            pipelines: []
        }
    },
    props: ['team'],
    mounted() {
        let getMembers = `/api/member/${this.team.team_id}/All`
        let getPipelines = `/api/pipeline/${this.team.team_id}/All`
        const promiseMembers = axios.get(getMembers, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('vue-token')
        }})
        const promisePipelines = axios.get(getPipelines, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('vue-token')
        }})

        Promise.all([promiseMembers, promisePipelines])
        .then(results => {
            this.members = results[0].data
            this.pipelines = results[1].data
        })
    }
}
</script>
