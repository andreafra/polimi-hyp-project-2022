<template>
	<div class="card">
		<div class="card-body">
			<h3 class="card-title">{{ object.title }}</h3>
			<p v-if="object.subtitle" class="card-subtitle">
				{{ object.subtitle }}
			</p>
			<div
				:style="{ backgroundImage: `url(${object.img})` }"
				:aria-label="object.alt"
				role="img"
				class="card-image"
			/>
			<p class="card-description">{{ object.description }}</p>
			<ButtonPrimary title="Read More" :link="object.url" />
		</div>
	</div>
</template>

<script>
import ButtonPrimary from "./ButtonPrimary.vue"
export default {
	name: "CardComponent",
	components: { ButtonPrimary },
	props: {
		object: {
			type: Object,
			required: true,
		},
	},
}
</script>

<style scoped>
.card {
	display: block;
	border: 2px solid var(--color-neutral);
	padding: var(--space-1);
	border-radius: var(--border-radius);
	width: 100%;
}
.card:hover {
	border: 2px solid var(--color-dark);
}

.card-title {
	margin: 0;
}
.card-subtitle {
	font-style: italic;
	margin: var(--space-0) 0;
}

.card-image {
	display: block;
	margin: var(--space-1) 0;
	border-radius: var(--border-radius);
	background-color: var(--color-neutral);
	background-position: center;
	background-size: cover;
	aspect-ratio: 16 / 9;
	width: 100%;
	height: var(--image-height);
}
</style>
