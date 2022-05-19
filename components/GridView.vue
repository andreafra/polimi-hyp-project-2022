<template>
	<div class="grid-container">
		<div v-for="(obj, index) of objects" :key="index" ref="elem">
			<Card :object="obj" />
		</div>
	</div>
</template>

<script>
import Card from "./Card.vue"
export default {
	name: "GridView",
	components: { Card },
	props: {
		objects: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style scoped>
@import "@/assets/styles/containers.css";
</style>
