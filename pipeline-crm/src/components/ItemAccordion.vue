<template>
<div data-bs-parent="#itemAccordion" class="col-lg-12 overlay collapse in" :id="'toggle' + item.item_id">
<div class="accordion-content">
    <div class="row">
    <div class="container mb-4 mt-0">
        <button type="button" class="btn btn-dark" @click="editForm">Edit Item <i class="fa-solid" :class="iconClass"></i></button>
        <form class="create-form p-3" @submit.prevent="editItem" v-show="showForm">
            <h3 class="fs-4 mb-2">Edit {{ item.title }}</h3>
                <div class="form-group mb-3">
                <label for="title">Item Title:</label>
                <input maxlength="64" :class="{'border border-danger': title === ''}" required v-model="title" type="text" class="form-control" placeholder="Item Name" id="title">
                </div>
                <div class="form-group mb-3">
                <label for="contractedRev">Contracted Revenue:</label>
                <input maxlength="15" :class="{'border border-danger': contractedRev === ''}" type="text" pattern="\d{1,10}(?:\.\d{1,2})?$" v-model="contractedRev" class="form-control" placeholder="1000.00" id="contractedRev">
                </div>
                <div class="form-group mb-3">
                <label for="statusSelect">Status:</label>
                <select v-model="statusSelect" name="statusSelect" id="statusSelect" class="form-select">
                <option :value="status.status_id" :key="'status' + status.status_id" v-for="status in statuses" >{{ status.code }}</option>
                </select>
                </div>
                <div class="form-group mb-3">
                <label for="completionSelect">Completion:</label>
                <select v-model="completionSelect" name="completionSelect" id="completionSelect" class="form-select">
                <option :value="completion.completion_id" :key="'completion' + completion.completion_id" v-for="completion in completions" >{{ completion.code }}</option>
                </select>
                </div>
                <div class="form-group mb-3">
                <label for="plannedStart">Planned Start:</label>
                <DatePicker v-model="plannedStart" id="plannedStart" valueType="format"/>
                </div>
                <div class="form-group mb-3">
                <label for="plannedEnd">Planned End:</label>
                <DatePicker v-model="plannedEnd" id="plannedEnd" valueType="format"/>
                </div>
                <div class="form-group mb-3">
                <label for="actualStart">Actual Start:</label>
                <DatePicker v-model="actualStart" id="actualStart" valueType="format"/>
                </div>
                <div class="form-group mb-3">
                <label for="actualEnd">Actual End:</label>
                <DatePicker v-model="actualEnd" id="actualEnd" valueType="format"/>
                </div>
                <input class="btn btn-dark mt-3" type="submit" :disabled="!title || !contractedRev">
        </form>
    </div>
    <h3 class="mb-0">Item information</h3>
    <div class="col-12 col-lg-6">
        <div class="item-dates row">
            <div class="col-12 col-lg-6">
                <div class="p-start">
                <h4>Planned Start:</h4>
                <p v-if="item.planned_start == null">{{ "NULL" }}</p>
                <p v-else-if="item.planned_start != null">{{ new Date(item.planned_start).toISOString().split('T')[0] }}</p>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="p-end">
                <h4>Planned End:</h4>
                <p v-if="item.planned_end == null">{{ "NULL" }}</p>
                <p v-else-if="item.planned_end != null">{{ new Date(item.planned_end).toISOString().split('T')[0] }}</p>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="a-start">
                <h4>Actual Start:</h4>
                <p v-if="item.actual_start == null">{{ "NULL" }}</p>
                <p v-else-if="item.actual_start != null">{{ new Date(item.actual_start).toISOString().split('T')[0] }}</p>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="a-end">
                <h4>Actual End:</h4>
                <p v-if="item.actual_end == null">{{ "NULL" }}</p>
                <p v-else-if="item.actual_end != null">{{  new Date(item.actual_end).toISOString().split('T')[0] }}</p>
                </div>
            </div>
        </div>
    </div>  
    <div class="col-12 col-lg-6">
        <div class="item-info row">
            <div>
                <h4 class="mb-4">Client: <span class="ms-2">{{ item.client_name }}</span></h4>
                <h4 class="mb-4">Product: <span class="ms-2">{{ item.product_name }}</span></h4>
                <h4 class="mb-4">Contracted Revenue: <span class="ms-2">${{ item.contracted_rev }}</span></h4>
            </div>
        </div>
    </div>
    </div>
</div>
</div>
</template>

<script>
const axios = require('axios')
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
    name: 'ItemAccordion',
    components: {
        DatePicker
    },
    data() {
        return {
            title: this.item.title,
            contractedRev:  this.item.contracted_rev,
            plannedStart: this.item.planned_start,
            plannedEnd: this.item.planned_end,
            actualStart: this.item.actual_start,
            actualEnd: this.item.actual_end,
            statusSelect: 1,
            completionSelect: 1,
            showForm: false
        }
    },
    props: ['item', 'completions', 'statuses'],
    methods: {
        editForm() {
            this.showForm = !this.showForm
        },
        formatDate(date) {
            if(new Date(date).toISOString().split('T')[0] != '1970-01-01') {
                return new Date(date).toISOString().split('T')[0]
            }
            else return null
        },
        editItem() {
        let newItemTitle = this.title
        let itemEdit = { completion_id: this.completionSelect, status_id: this.statusSelect, title: newItemTitle, contracted_rev: this.contractedRev, planned_start: this.formatDate(this.plannedStart), planned_end: this.formatDate(this.plannedEnd), actual_start: this.formatDate(this.actualStart), actual_end: this.formatDate(this.actualEnd) }
        let config = {
            method: 'put',
            url: `/api/item/${this.item.item_id}`,
            // url: `http://localhost:3000/api/item/${this.item.item_id}`,
            data: itemEdit
        }
        axios(config)
        .then(response => {
            console.log(response)
            this.$parent.getItems()
            this.showForm = false
        })
    }
    },
    mounted() {
    },
    computed: {
        iconClass() {
            return {
                'fa-square-plus': this.showForm === false,
                'fa-square-minus': this.showForm === true
            }
        }
    }
}
</script>

<style scoped>
.item-dates {
    border: none !important;
    padding: 0 !important;
    margin-top: 0 !important;
}
.item-dates div {
    height: 200px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none !important;
    margin-top: 0 !important;
}
.item-dates div div {
    border: 1px solid #cccccc !important;
    height: 100% !important;
    width: 100%;
}
.item-info {
    border: none !important;
    margin-top: 0 !important;
}
.item-info div {
    margin-top: 0 !important;
    border: 1px solid #cccccc !important;
}
h4 span {
    font-size: 16px;
    font-weight: normal;
}

.accordion-content .row .form-group, .accordion-content .row .form-group .mx-datepicker{
    border: none !important;
    padding: 0px;
    margin-top: 0px;
}
.mx-input-wrapper {
    border: none !important;
    padding: 0px;
    margin-top: 0px;
}

.mx-datepicker {
    display: block;
    width: 100%;
}
</style>
