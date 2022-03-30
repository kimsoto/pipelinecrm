<template>
<div class="col-4 accordion-grid">
    <figure>
        <a class="mb-4" :href="'#toggle' + item.item_id" :id="'aFig' + item.item_id" data-bs-toggle="collapse" aria-expanded="false" :aria-controls="'toggle' + item.item_id">{{ item.title }}</a>
        <p class="mb-1">Status: {{ item.status_code }}</p>
        <p class="mb-1" :class="completionColor">Completion: {{ item.completion_value * 100 }}% </p>
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
        completionColor() {
            return {
                'text-danger': this.item.completion_value === 0 || this.item.completion_value === 0.25,
                'text-warning': this.item.completion_value === 0.5 || this.item.completion_value === 0.75,
                'text-success': this.item.completion_value === 1
            }
        }
    }
}
</script>

<style scoped>
.accordion-grid figure {
    flex-direction: column;
}

.hidden {
    display: none;
}

.accordion-grid figure p {
    text-align: center;
    font-size: 12px;
}

figure a[aria-expanded="true"]::after {
    bottom: -164px;
}

@media only screen and (min-width: 768px) {
    .accordion-grid figure p {
        font-size: 16px;
    }
    figure a[aria-expanded="true"]::after {
        bottom: -170px;
    }
}

/*
*Screen and above
*/
@media only screen and (min-width: 1200px) {
    figure a[aria-expanded="true"]::after {
        bottom: -165px; 
    }
}

</style>
