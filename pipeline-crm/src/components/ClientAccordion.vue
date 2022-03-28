<template>
<div data-bs-parent="#clientAccordion" :class="{'show': showAccordion == 'toggle' + client.client_id }" class="col-lg-12 overlay collapse in" :id="'toggle' + client.client_id">
<div class="accordion-content">
    <div class="row">
    <h3>Client information</h3>
    <div class="col-12 col-md-4">
        <div class="client">
            <div>
                <h4 class="mb-4">Status: <span class="ms-2" :class="statusColor">{{ client.code }}</span></h4>
            </div>
        </div>
    </div>  
    <div class="col-12 col-md-4">
        <div class="items" v-if="items.length > 0">
            <h4>Items</h4>
            <ul class="list-group" :key="item.item_id" v-for="item of items">
                <li class="list-group-item list-group-item-action mb-1">
                    <a :href="'/Item/#toggle' + item.item_id"><p>{{ item.title }}</p></a>
                </li>
            </ul>
        </div>
        <div class="items" v-else>
            <h4>Items</h4>
            <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>No items have been assigned to this client.</p>
                </li>
            </ul>
        </div>
    </div> 
    <div class="col-12 col-md-4">
        <div class="contacts">
            <h4>Contacts</h4>
            <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Contact 1</p>
                </li>
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Contact 2</p>
                </li>
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Contact 3</p>
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
    name: 'ClientAccordion',
    data() {
        return {
            items: []
        }
    },
    props: ['client'],
    methods: {
    },
    mounted() {
        axios
        // .get(`http://localhost:3000/api/item/${this.client.client_id}/All`)
        .get(`/api/item/${this.client.client_id}/All`)
        .then(response => {
            this.items = response.data
        })
    },
    computed: {
        statusColor() {
            return {
                'text-success': this.client.status_id === 1,
                'text-danger': this.client.status_id === 2,
                'text-warning': this.client.status_id === 3
            }
        },
        showAccordion() {
            return window.location.href.split('#').pop()
        }
    }
}
</script>

<style scoped>
.client div {
    border: none !important;
    padding: 0 !important;
}
h4 span {
    font-size: 16px;
    font-weight: normal;
}
</style>
