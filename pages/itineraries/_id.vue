<template>
	<article>
		<span class="category">Itinerary</span>
		<h1>{{ itinerary.name }}</h1>
		<img :src="itinerary.images[0].url" :alt="itinerary.images[0].alt" />
		<p><b>Duration: </b>{{ itinerary.duration }}</p>
		<p><b>Distance: </b>{{ itinerary.distance }}</p>
		<p>{{ itinerary.description }}</p>
		<!-- TODO: ADD IFRAME MAP-->
		<h2>Points of Interest in this Itinerary</h2>
		<h-scroll-view>
			<card v-for="obj of getPoIs()" :key="obj.id" :object="obj" />
		</h-scroll-view>
		<!-- TODO: ADD BOTTOM GROUP LINKS-->
	</article>
</template>

<script>
import HScrollView from "~/components/HScrollView.vue"
import Card from "~/components/Card.vue"
export default {
	name: "ItineraryPage",
	components: {
		HScrollView,
		Card,
	},
	async asyncData({ $axios, params }) {
		const res = await $axios.$get(`/api/itineraries/${params.id}`)
		return { itinerary: res }
	},
	data() {
		return { itinerary: {}, pois: [] }
	},
	methods: {
		getPoIs() {
			return this.itinerary.pointsOfInterest.map((el) => ({
				title: el.name,
				img: el.images[0].url,
				alt: el.images[0].alt,
				description: el.description,
				url: `/pois/${el.id}?itinerary=${this.itinerary.id}`,
			}))
		},
	},
}
</script>
