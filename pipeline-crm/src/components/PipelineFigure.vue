<template>
<div class="col-lg-4 col-sm-6 col-12 accordion-grid">
    <figure>
        <a :href="'#toggle' + pipeline.pipeline_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + pipeline.pipeline_id">{{ pipeline.name }}</a>
        <p>{{pipeline.team_name}}</p>
    </figure>
</div>
</template>

<script>
export default {
    name: 'PipelineFigure',
    data() {
        return {
        }
    },
    props: ['pipeline'],
    methods: {
    },
    mounted() {
    }
}
</script>

<style scoped>
.accordion-grid figure {
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
