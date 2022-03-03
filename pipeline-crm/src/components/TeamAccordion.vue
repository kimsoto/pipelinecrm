<template>
<div data-bs-parent="#pipelineAccordion" class="col-lg-12 overlay collapse in accordion-content" :id="'toggle' + pipeline.pipeline_id">
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
            <ul class="list-group" :key="pipeline.pipeline_id" v-for="pipeline of pipelines">
            <li class="list-group-item list-group-item-action mb-1">
                <p>{{ pipeline.name }}</p>
            </li>
            </ul>
        </div>
        <div class="members">
            <h4>Members</h4>
            <ul class="list-group" :key="member.member_id" v-for="member of members">
            <li class="list-group-item list-group-item-action mb-1">
                <p>{{ member.name }}</p>
            </li>
            </ul>
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
    },
    mounted() {
        let getMembers = `/api/member/${this.team.team_id}/All`
        let getPipelines = `/api/pipeline/${this.team.team_id}/All`
        const promiseMembers = axios.get(getMembers)
        const promisePipelines = axios.get(getPipelines)

        Promise.all([promiseMembers, promisePipelines])
        .then(results => {
            this.members = results[0].data
            this.pipelines = results[1].data

        })
    }
}
</script>

<style scoped>
</style>
