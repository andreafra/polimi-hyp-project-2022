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
import Utils from "~/mixins/utils"
export default {
	name: "AllItinerariesPage",
	components: { Card, GridView },
	mixins: [Utils],
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
			return this.itineraries.map(this.getCardItinerary)
		},
	},
}
</script>
