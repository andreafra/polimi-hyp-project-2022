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
	grid-row-gap: var(--space-1);
	grid-column-gap: var(--space-1);
	grid-template-columns: var(--grid-template-columns);

	margin: var(--space-1) 0;
}
</style>
