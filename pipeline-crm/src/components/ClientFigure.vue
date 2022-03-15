<template>
<div class="col-4 accordion-grid">
    <figure>
        <a :href="'#toggle' + client.client_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + client.client_id">{{ client.name }}</a>
        <i class="fa-solid" :class="iconClass"></i>
    </figure>
</div>
</template>

<script>
export default {
    name: 'ClientFigure',
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
        iconClass() {
            return {
                'fa-square-check': this.client.status_id === 1,
                'text-success': this.client.status_id === 1,
                'fa-square-xmark': this.client.status_id === 2,
                'text-danger': this.client.status_id === 2,
                'fa-square': this.client.status_id === 3,
                'text-warning': this.client.status_id === 3
            }
        }
    }
}
</script>

<style scoped>
</style>
