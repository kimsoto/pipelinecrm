<template>
<div data-bs-parent="#pipelineAccordion" class="col-lg-12 overlay collapse in" :id="'toggle' + pipeline.pipeline_id">
<div class="accordion-content">
    <div class="row">
    <h3>Pipeline information</h3>
    <div class="col-12 col-sm-6">
        <div class="product">
            <h4>Products</h4>
            <ul class="list-group" :key="product.product_id" v-for="product of products">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>{{ product.name }}</p>
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

export default {
    name: 'PipelineAccordion',
    data() {
        return {
            products: []
        }
    },
    props: ['pipeline'],
    methods: {
    },
    mounted() {
        axios
        // .get(`http://localhost:3000/api/product/${this.pipeline.pipeline_id}/All`)
        .get(`/api/product/${this.pipeline.pipeline_id}/All`)
        .then(response => {
            this.products = response.data
        })
    }
}
</script>

<style scoped>
</style>
