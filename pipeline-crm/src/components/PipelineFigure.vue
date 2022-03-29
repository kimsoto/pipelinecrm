<template>
<div class="col-4 accordion-grid">
    <figure>
        <a :href="'#toggle' + pipeline.pipeline_id" data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + pipeline.pipeline_id">{{ pipeline.name }}</a>
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
    },
    computed: {
        showAccordion() {
            return window.location.href.split('#').pop()
        }
    }
}
</script>

<style scoped>
.accordion-grid figure {
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.accordion-grid figure p {
    text-align: center;
    font-size: 14px;
}

figure a::after {
    bottom: -145px;
}

@media only screen and (min-width: 768px) {
.accordion-grid figure p {
    font-size: 16px;
}
}
</style>
