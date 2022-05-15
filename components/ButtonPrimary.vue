<template>
	<nuxt-link :to="link" class="button">{{ title }}</nuxt-link>
</template>

<script>
export default {
	name: "ButtonPrimary",
	props: {
		title: { required: true, type: String },
		link: { required: true, type: String },
	},
}
</script>

<style scoped>
.button {
	color: var(--color-bg-dark);
	display: inline-block;
	padding: 1em;
	border: 2px solid var(--color-accent-dark);
	border-radius: var(--border-radius);
	background-color: var(--color-accent);
	font-family: var(--font-family-heading);
	font-size: var(--font-size-button);
	font-weight: bold;
	text-decoration: none;
}
.button:hover {
	background-color: var(--color-accent-dark);
}
</style>
