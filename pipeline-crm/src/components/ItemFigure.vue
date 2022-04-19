<template>
<div class="col-4 accordion-grid">
    <figure>
        <a class="mb-4" :href="'#toggle' + item.item_id" :id="'aFig' + item.item_id" data-bs-toggle="collapse" :aria-expanded="showArrow ? true : false" :aria-controls="'toggle' + item.item_id">{{ item.title }}</a>
        <p class="mb-1">Status: {{ item.status_code }}</p>
        <p class="mb-1" :class="completionColor">Completion: {{ item.completion_value * 100 }}% </p>
    </figure>
</div>
</template>

<script>

/**
 * This is the Item card component
 * 
 * It shows the Item Title, the Item Status, and the Completion of the Item
 */
export default {
    name: 'ItemFigure',
    props: ['item'],
    computed: {
        showArrow() {
            return window.location.href.split('#').pop() === 'toggle' + this.item.item_id
        },
        showAccordion() {
            return window.location.href.split('#').pop()
        },
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
