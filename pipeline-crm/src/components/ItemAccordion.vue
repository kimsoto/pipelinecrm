<template>
<div data-bs-parent="#itemAccordion" class="col-lg-12 overlay collapse in" :id="'toggle' + item.item_id">
<div class="accordion-content">
    <div class="row">
    <h3>Item information</h3>
    <div class="col-12 col-sm-6">
        <div class="item-dates row">
            <div class="p-start col-6">
                <h4>Planned Start:</h4>
                <p>{{ item.planned_start || "NULL" }}</p>
            </div>
            <div class="p-end col-6">
                <h4>Planned End:</h4>
                <p>{{ item.planned_end || "NULL" }}</p>
            </div>
            <div class="a-start col-6">
                <h4>Actual Start:</h4>
                <p>{{ item.actual_start || "NULL" }}</p>
            </div>
            <div class="a-end col-6">
                <h4>Actual End:</h4>
                <p>{{ item.actual_end || "NULL" }}</p>
            </div>
        </div>
    </div>  
    <div class="col-12 col-sm-6">
        <div class="item-info">
            <ul class="list-group">
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Client: {{ item.client_id }}</p>
                </li>
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Product: {{ item.product_id }}</p>
                </li>
                <li class="list-group-item list-group-item-action mb-1">
                    <p>Contracted Revenue: {{ item.contracted_rev }}</p>
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
    name: 'ItemAccordion',
    data() {
        return {
        }
    },
    props: ['item'],
    methods: {
    },
    mounted() {
    },
    computed: {

    }
}
</script>

<style scoped>
.item-dates {
    border: none !important;
    padding: 0 !important;
}
.item-dates div {
    height: 200px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
