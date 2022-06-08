<template>
	<div class="map-container">
		<iframe class="map" :src="map"></iframe>
	</div>
</template>

<script>
export default {
	name: "MapContainerComponent",
	props: {
		map: {
			type: String,
			required: true,
		},
	},
}
</script>

<style scoped>
.map-container {
	aspect-ratio: 16 / 9;
	width: 100%;
	height: 24em;
	overflow: hidden;
	border-radius: var(--border-radius);
}

.map {
	position: relative;
	border: none;
	width: 100%;
	height: 100%;
	border-radius: var(--border-radius);
}
</style>
