<template>
	<div class="grid-container">
		<slot />
	</div>
</template>

<script>
export default {
	name: "GridView",
}
</script>

<style scoped>
.grid-container {
	display: grid;
	grid-row-gap: var(--space-y-1);
	grid-column-gap: var(--space-y-1);
	grid-template-areas: "a";

	margin: var(--space-y-1) 0;
}

@media only screen and (min-width: 840px) {
	.grid-container {
		grid-template-areas: "a a a";
	}
}
</style>
