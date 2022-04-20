<template>
<div>
    <div class="pipe">
    <a class="text-center" :href="'#/Pipeline/#toggle' + pipeline.pipeline_id"><h4 class="mb-5">{{pipeline.name}}</h4></a>
    <div class="revenue">
        <p class="fw-bold">Contracted Revenue:</p>
        <p>${{ productPrices.reduce((total, i) => total + i, 0) }}</p>
    </div>
    </div>
</div>
</template>

<script>
const axios = require('axios')

/**
 * This is the Home Pipe component
 * 
 * It shows the Pipeline Name, and the Pipeline Product's Contracted Revenue
 * Once the component is loaded it will call the List Pipeline Products API calls
 */
export default {
    name: 'HomePipe',
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
.pipe {
    padding: 40px 20px;
    background-color: #fff;
    margin: 0px 40px 20px 40px;
}
.pipe .completion, .pipe .revenue {
    background-color: #eeeeee;
    padding: 10px;
    text-align: center;
}

/*
*Tablet and above
*/
@media only screen and (min-width: 768px) {
    .pipe {
        margin: 0px 20px 20px 20px;
    }
}
</style>
