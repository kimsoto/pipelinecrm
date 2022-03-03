<template>
<div class="col-lg-4 col-sm-6 col-12 accordion-grid">
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
