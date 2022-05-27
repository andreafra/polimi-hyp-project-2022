<template>
	<div>
		<h1>All Itineraries</h1>
		<p>
			Here's all the itineraries that are available right now in the town!
		</p>
		<grid-view>
			<card
				v-for="(itinerary, index) of getItineraries()"
				:key="index"
				:object="itinerary"
			/>
		</grid-view>
		<h3 v-if="itineraries.length === 0">No itineraries found!</h3>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"

export default {
	name: "AllItinerariesPage",
	components: { Card },
	async asyncData({ $axios }) {
		const res = await $axios.$get(`/api/itineraries`)

		return { itineraries: res }
	},
	data: () => ({
		itineraries: [],
	}),
	methods: {
		getItineraries() {
			return this.itineraries.map((itinerary) => {
				const duration = new Date(itinerary.duration)
				const hours = duration.getHours()
				const minutes = duration.getMinutes()
				const durationLabel = hours
					? hours + "h"
					: "" + minutes
					? minutes + "m"
					: ""
				const distance = itinerary.distance / 1000
				return {
					title: itinerary.name,
					subtitle: `Duration: ${durationLabel} | Distance: ${distance} Km`,
					img: itinerary.images[0].url,
					alt: itinerary.images[0].alt,
					description: itinerary.description,
					url: `/itineraries/${itinerary.id}`,
				}
			})
		},
	},
}
</script>
