<script>
import HScrollView from "~/components/HScrollView.vue"
import Card from "~/components/Card.vue"

export default {
	name: "IndexPage",
	components: { HScrollView, Card },
	async asyncData({ $axios }) {
		const res = await $axios.$get("/api/events")
		return { events: res }
	},
	data: () => ({
		events: [],
	}),
	methods: {
		getEvents() {
			return this.events
				.map((event) => ({
					title: event.name,
					subtitle: `${event.date}`,
					img: event.images[0].url,
					alt: event.images[0].alt,
					description: event.description,
					url: `/events/${event.id}`,
				}))
				.slice(0, 3)
				.sort((a, b) => new Date(a.date) - new Date(b.date))
		},
	},
}
</script>

<template>
	<div>
		<img
			class="welcome-image"
			src="~/assets/images/home2.jpg"
			alt="sito archeoleogico"
		/>
		<h1>Welcome to Minturno!</h1>
		<h3>Take a look at our latest events:</h3>
		<h-scroll-view>
			<card
				v-for="(event, index) of getEvents()"
				:key="'event-index-' + index"
				:object="event"
			/>
		</h-scroll-view>
<<<<<<< HEAD
		<grid-view>
			<div
				v-for="x of [1, 2, 3, 4, 5, 6, 7]"
				:key="x"
				style="height: 300px; background: green"
			>
				{{ x }}
			</div>
		</grid-view>
		<steps-navigator
			:prev-step="{
				url: `/pois/poi_x?itinerary=itinerary_x`,
				title: 'Very very very very very very very very very very very very very very very very very very very very very very very very long title',
				img: 'poi_spiaggia_dei_sassolini_01.jpg',
				label: 'Previous step in itinerary',
			}"
			:next-step="{
				url: `/pois/poi_y?itinerary=itinerary_x`,
				title: 'PoI Y',
				img: 'poi_spiaggia_dei_sassolini_01.jpg',
				label: 'Next step in itinerary',
			}"
		>
		</steps-navigator>
		<br />
		<steps-navigator
			:next-step="undefined"
			:prev-step="{
				url: `/pois/poi_y?itinerary=itinerary_x`,
				title: 'PoI Y',
				img: 'poi_spiaggia_dei_sassolini_01.jpg',
				label: 'Previous step in itinerary',
			}"
		>
		</steps-navigator>
=======
>>>>>>> main
	</div>
</template>

<style scoped>
.welcome-image {
	margin-top: var(--space-1);
	width: 100%;
	border-radius: var(--border-radius);
}
</style>
