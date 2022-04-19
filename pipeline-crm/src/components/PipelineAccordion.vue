<template>
<div data-bs-parent="#pipelineAccordion" :class="{'show': showAccordion == 'toggle' + pipeline.pipeline_id }" class="col-lg-12 overlay collapse in" :id="'toggle' + pipeline.pipeline_id">
<div class="accordion-content">
    <div class="row">
    <h3>Pipeline information</h3>
    <div class="col-12 col-md-6">
        <div class="product" v-if="products.length > 0">
            <h4>Products</h4>
            <ul class="list-group" :key="product.product_id" v-for="product of products">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>{{ product.name }}</p>
                </li>
            </ul>
        </div>
        <div class="product" v-else>
            <h4>Products</h4>
            <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>No products have been assigned to this pipeline.</p>
                </li>
            </ul>
        </div>
    </div>  
    <div class="col-12 col-md-6" v-if="products.length > 0">
        <div class="product-prices">
            <h4>Product Prices Total: <span class="ms-2">${{ productPrices.reduce((total, i) => total + i, 0) }}</span></h4>
        </div>
    </div>
    </div>
</div>
</div>
</template>

<script>
const axios = require('axios')

/**
 * This is the Pipeline detail accordion
 * 
 * It shows the Total Product Prices, and the Products's assigned to the Pipeline.
 * If no Products's are assigned to the Pipeline, it will show a message stating that no products have been assigned.
 * Once the component is loaded it will call the List Pipeline Products API calls
 */
export default {
    name: 'PipelineAccordion',
    data() {
        return {
            products: [],
            productPrices: []
        }
    },
    props: ['pipeline'],
    mounted() {
        let config = {
            method: 'get',
            url: `/api/product/${this.pipeline.pipeline_id}/All`,
            // url: `http://localhost:3000/api/product/${this.pipeline.pipeline_id}/All`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('vue-token')
            }
        }

        axios(config)
        .then(response => {
            this.products = response.data
            for(let product of this.products){
                this.productPrices.push(product.price)
            }
        })
    },
    computed: {
        showAccordion() {
            return window.location.href.split('#').pop()
        }
    }
}
</script>

<style scoped>
h4 span {
    font-size: 16px;
    font-weight: normal;
}
</style>
