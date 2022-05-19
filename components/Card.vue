<template>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title">{{ object.title }}</h4>
			<h6 v-if="object.subtitle" class="card-subtitle">
				{{ object.subtitle }}
			</h6>
			<img :src="object.img" :alt="object.alt" class="card-image" />
			<p class="card-description">{{ object.description }}</p>
			<ButtonPrimary title="Read More" :link="object.url"/>
		</div>
	</div>
</template>

<script>
import ButtonPrimary from './ButtonPrimary.vue'
export default {
    name: "CardComponent",
    components: { ButtonPrimary },
    props: {
        object: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style scoped>
.card {
	border: 2px solid var(--color-neutral);
}
.card:hover {
	border: 2px solid var(--color-dark);
}
.card-image {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	min-width: 100%;
}
</style>
