<template>
<div class="col-4 accordion-grid">
    <figure>
        <a :href="'#toggle' + pipeline.pipeline_id" data-bs-toggle="collapse" :aria-expanded="showArrow ? true : false" :aria-controls="'toggle' + pipeline.pipeline_id">{{ pipeline.name }}</a>
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
        showArrow() {
            return window.location.href.split('#').pop() === 'toggle' + this.pipeline.pipeline_id
        },
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

figure a[aria-expanded="true"]::after {
    bottom: -148px;
}

/*
*Tablet and above
*/
@media only screen and (min-width: 768px) {
    .accordion-grid figure p {
        font-size: 16px;
    }
    figure a[aria-expanded="true"]::after {
        bottom: -150px;  
        font: normal normal normal 40px/1 FontAwesome;
    }
}

/*
*Screen and above
*/
@media only screen and (min-width: 1200px) {
    .accordion-grid a {
        font-size: 24px;
    }
    figure a[aria-expanded="true"]::after {
        bottom: -145px; 
    }
}
</style>
