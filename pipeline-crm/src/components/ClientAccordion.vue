<template>
<div data-bs-parent="#clientAccordion" :class="{'show': showAccordion == 'toggle' + client.client_id }" class="col-lg-12 overlay collapse in" :id="'toggle' + client.client_id">
<div class="accordion-content">
    <div class="row">
    <h3>Client information</h3>
    <div class="col-12 col-md-6">
        <div class="client">
            <div>
                <h4 class="mb-4">Status: <span class="ms-2" :class="statusColor">{{ client.code }}</span></h4>
            </div>
        </div>
    </div>  
    <div class="col-12 col-md-6">
        <div class="items" v-if="items.length > 0">
            <h4>Items</h4>
            <ul class="list-group" :key="item.item_id" v-for="item of items">
                <li class="list-group-item list-group-item-action mb-1">
                    <a :href="'#/Item/#toggle' + item.item_id"><p>{{ item.title }}</p></a>
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
    </div>
</div>
</div>
</template>

<script>
const axios = require('axios')

/**
 * This is the Client detail accordion
 * 
 * It shows the Client Status, and the Item's assigned to the Client.
 * If no Item's are assigned to the Client, it will show a message stating that no items have been assigned.
 * Once the component is loaded it will call the List Client Items API calls
 */
export default {
    name: 'ClientAccordion',
    data() {
        return {
            items: []
        }
    },
    props: ['client'],
    mounted() {
        let config = {
            method: 'get',
            url: `/api/item/${this.client.client_id}/All`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('vue-token')
            }
        }

        axios(config)
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
