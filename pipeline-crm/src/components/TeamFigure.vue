<template>
<div class="col-4 accordion-grid">
  <figure>
  <a :href="'#toggle' + team.team_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + team.team_id">{{ team.name }}</a>
  </figure>
</div>
</template>

<script>
export default {
  name: 'TeamFigure',
  data() {
    return {
    }
  },
  props: ['team'],
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
