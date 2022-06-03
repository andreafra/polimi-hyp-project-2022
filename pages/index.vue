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
				.sort((a, b) => new Date(a.date) - new Date(b.date))
				.map((event) => ({
					title: event.name,
					subtitle: `${new Date(event.date).toLocaleDateString(
						"en-GB",
						{
							dateStyle: "short",
						}
					)}`,
					img: event.images[0].url,
					alt: event.images[0].alt,
					description: event.description,
					url: `/events/${event.id}`,
				}))
				.slice(0, 3)
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
	</div>
</template>

<style scoped>
.welcome-image {
	margin-top: var(--space-1);
	width: 100%;
	border-radius: var(--border-radius);
}
</style>
