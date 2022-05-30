<template>
	<div>
		<h1>All Points of Interest</h1>
		<p>
			Here's all the Points of Interest that are available right now in
			the town!
		</p>
		<grid-view>
			<card v-for="poi of getPoIs()" :key="poi.id" :object="poi" />
		</grid-view>
		<h3 v-if="pois.length === 0">No pois found!</h3>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"
import GridView from "~/components/GridView.vue"

export default {
	name: "AllPoisPage",
	components: { Card, GridView },
	async asyncData({ $axios }) {
		const res = await $axios.$get(`/api/pois`)

		return { pois: res }
	},
	data: () => ({
		pois: [],
	}),
	head() {
		return {
			title: "Points of Interest",
		}
	},
	methods: {
		getPoIs() {
			return this.pois.map((poi) => {
				return {
					id: poi.id,
					title: poi.name,
					img: poi.images[0].url,
					alt: poi.images[0].alt,
					description: poi.description,
					url: `/pois/${poi.id}`,
				}
			})
		},
	},
}
</script>
