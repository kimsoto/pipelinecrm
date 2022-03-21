<template>
<div class="col-4 accordion-grid">
    <figure>
        <a :href="'#toggle' + item.item_id"  data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + item.item_id">{{ item.title }}</a>
        <p>{{ item.status_id }}</p>
        <p>{{ item.completion_id }}</p>
    </figure>
</div>
</template>

<script>

export default {
    name: 'ItemFigure',
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

</style>
