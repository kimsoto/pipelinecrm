<template>
<div class="col-4 accordion-grid">
    <figure>
        <a :href="'#toggle' + client.client_id"  data-bs-toggle="collapse" :aria-expanded="showArrow ? true : false" :aria-controls="'toggle' + client.client_id">{{ client.name }}</a>
        <i class="status-icon fa-solid" :class="iconClass"></i>
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
        showArrow() {
            return window.location.href.split('#').pop() === 'toggle' + this.client.client_id
        },
        showAccordion() {
            return window.location.href.split('#').pop()
        },
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
.accordion-grid figure {
    position: relative;
}
i.status-icon {
    font-size: 25px;
    position: absolute;
    right: 15px;
    bottom: 10px;
}
/*
*Tablet and above
*/
@media only screen and (min-width: 768px) {
    i.status-icon {
        font-size: 30px;
    }
}

/*
*Screen and above
*/
@media only screen and (min-width: 1200px) {
    i.status-icon {
        font-size: 35px;
    }
}
</style>
