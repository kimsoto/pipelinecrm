<template>
<div class="col-4 accordion-grid">
    <figure>
        <a :href="'#toggle' + client.client_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + client.client_id">{{ client.name }}</a>
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
    }
}
</script>

<style scoped>
</style>
