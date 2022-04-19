<template>
<div class="col-4 accordion-grid">
  <figure class="yes">
  <a :href="'#toggle' + team.team_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + team.team_id">{{ team.name }}</a>
  </figure>
</div>
</template>

<script>

/**
 * This is the Team card component
 * 
 * It shows the Team Name
 */
export default {
  name: 'TeamFigure',
  props: ['team']
}
</script>
