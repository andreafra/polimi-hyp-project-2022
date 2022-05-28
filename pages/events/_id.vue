<template>
	<article>
		<span class="category">Event</span>
		<h1>{{ event.name }}</h1>
		<h-scroll-view>
			<img
				v-for="(img, index) of event.images"
				:key="index"
				:src="img.img"
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
	data() {
		return { event: {}, poi: null }
	},
	async fetch() {
		const event = await this.$axios.$get(
			`/api/events/${this.$route.params.id}`
		)
		this.event = event
		// Save PoI where the event is hosted
		const poi = event.pointOfInterest
		this.poi = {
			title: poi.name,
			description: poi.description,
			img: poi.images[0].img,
			alt: poi.images[0].alt,
			url: "/pois/" + poi.id,
		}
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
