<template>
<div data-bs-parent="#pipelineAccordion" class="col-lg-12 overlay collapse in" :id="'toggle' + pipeline.pipeline_id">
<div class="accordion-content">
    <h3>Pipeline information</h3>
    <div class="items">
        <h4>Products</h4>
        <ul class="list-group">
        <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 1</a></li>
        <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 2</a></li>
        <li class="list-group-item list-group-item-action mb-1"><a href="#">Product 3</a></li>
        </ul>
    </div>  
</div>

</div>
</template>

<script>
// const axios = require('axios')

export default {
    name: 'PipelineAccordion',
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
</style>
