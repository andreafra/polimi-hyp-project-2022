<template>
	<div>
		<h1>All Points of Interest</h1>
		<p>
			Here's all the Points of Interest that are available right now in
			the town!
		</p>
		<grid-view>
			<card
				v-for="(poi, index) of getPoIs()"
				:key="index"
				:object="poi"
			/>
		</grid-view>
		<h3 v-if="pois.length === 0">No pois found!</h3>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"

export default {
	name: "AllPoIsPage",
	components: { Card },
	async asyncData({ $axios }) {
		const res = await $axios.$get(`/api/pois`)

		return { pois: res }
	},
	data: () => ({
		pois: [],
	}),
	methods: {
		getPoIs() {
			return this.pois.map((poi) => {
				const duration = new Date(poi.duration)
				const hours = duration.getHours()
				const minutes = duration.getMinutes()
				const durationLabel = hours
					? hours + "h"
					: "" + minutes
					? minutes + "m"
					: ""
				const distance = poi.distance / 1000
				return {
					title: poi.name,
					subtitle: `Duration: ${durationLabel} | Distance: ${distance} Km`,
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
