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
			<div class="column">
				<h2>Hosted at</h2>
				<card :object="getPoI()" />
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
	async asyncData({ $axios, params, redirect }) {
		if (!params.id) redirect("/events_all")
		const res = await $axios.$get(`/api/events/${params.id}`)
		return { event: res }
	},
	data() {
		return { event: {} }
	},

	methods: {
		getPoI() {
			const poi = this.event.pointOfInterest
			return {
				title: poi.name,
				description: poi.description,
				img: poi.images[0].img,
				alt: poi.images[0].alt,
				url: "/pois/" + poi.id,
			}
		},
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
