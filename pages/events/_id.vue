<template>
	<article>
		<span class="category">Event</span>
		<h1>{{ event.name }}</h1>
		<h-scroll-view>
			<img
				v-for="(img, index) of event.images"
				:key="index"
				:src="require(`~/assets/images/${img.url}?webp`)"
				:alt="img.alt"
			/>
		</h-scroll-view>
		<p>{{ event.description }}</p>
		<div class="row">
			<div class="column">
				<h2>Admission</h2>
				<p>{{ event.admission }}</p>
			</div>
			<div v-if="poi" class="column">
				<h2>Hosted at</h2>
				<card :object="poi" />
			</div>
		</div>
	</article>
</template>

<script>
import HScrollView from "~/components/HScrollView.vue"
import Card from "~/components/Card.vue"
export default {
	name: "EventPage",
	components: {
		HScrollView,
		Card,
	},
	async asyncData({ $axios, params }) {
		const event = await $axios.$get(`/api/events/${params.id}`)
		const poi = {
			title: event.pointOfInterest.name,
			description: event.pointOfInterest.description,
			img: event.pointOfInterest.images[0].url,
			alt: event.pointOfInterest.images[0].alt,
			url: "/pois/" + event.pointOfInterest.id,
		}
		return { event, poi }
	},
	data() {
		return { event: {}, poi: null }
	},
	head() {
		return { title: this.event.name }
	},
}
</script>

<style scoped>
.row {
	display: grid;
	grid-template-columns: 1fr;
	padding-bottom: var(--space-1);
}

@media only screen and (min-width: 840px) {
	.row {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
