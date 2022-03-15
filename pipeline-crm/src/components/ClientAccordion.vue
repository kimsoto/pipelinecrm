<template>
<div data-bs-parent="#clientAccordion" class="col-lg-12 overlay collapse in" :id="'toggle' + client.client_id">
<div class="accordion-content">
    <div class="row">
    <h3>Client information</h3>
    <div class="col-12 col-sm-6">
        <div class="client">
            <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Status: <span :class="statusColor">{{ client.code }}</span></p>
                </li>
            </ul>
        </div>
    </div>  
    <div class="col-12 col-sm-6">
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

export default {
    name: 'ClientAccordion',
    data() {
        return {
        }
    },
    props: ['client'],
    methods: {
    },
    mounted() {
    },
    computed: {
        statusColor() {
            return {
                'text-success': this.client.status_id === 1,
                'text-danger': this.client.status_id === 2,
                'text-warning': this.client.status_id === 3
            }
        }
    }
}
</script>

<style scoped>
</style>
