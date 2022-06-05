<template>
	<div>
		<h1>All Itineraries</h1>
		<p>
			Here's all the itineraries that are available right now in the town!
		</p>
		<grid-view>
			<card
				v-for="itinerary of getItineraries()"
				:key="itinerary.id"
				:object="itinerary"
			/>
		</grid-view>
		<h3 v-if="itineraries.length === 0">No itineraries found!</h3>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"
import GridView from "~/components/GridView.vue"
import CommonMixin from "~/mixins/common"
export default {
	name: "AllItinerariesPage",
	components: { Card, GridView },
	mixins: [CommonMixin],
	async asyncData({ $axios }) {
		const res = await $axios.$get(`/api/itineraries`)

		return { itineraries: res }
	},
	data: () => ({
		itineraries: [],
	}),
	head() {
		return {
			title: "Itineraries",
			meta: [
				{
					hid: "description",
					name: "description",
					content: `All itineraries page`,
				},
			],
		}
	},
	methods: {
		getItineraries() {
			return this.itineraries.map((itinerary) => {
				const duration = this.formatDuration(itinerary.duration)
				const distance = this.formatDistance(itinerary.distance)
				return {
					id: itinerary.id,
					title: itinerary.name,
					subtitle: `Duration: ${duration} | Length: ${distance}`,
					img: itinerary.images[0].url,
					alt: itinerary.images[0].alt,
					description: itinerary.description,
					url: `/itineraries/${itinerary.id}`,
					buttonDesc: "About this Itinerary",
				}
			})
		},
	},
}
</script>
