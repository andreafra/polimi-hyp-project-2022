<template>
	<article>
		<span class="category">Event</span>
		<h1>{{ event.name }}</h1>
		<span class="date-label">
			{{
				new Date(event.date).toLocaleString("en-GB", {
					dateStyle: "long",
				})
			}}
		</span>
		<h-scroll-view>
			<img
				v-for="(img, index) of event.images"
				:key="index"
				:src="require(`~/assets/images/${img.url}?webp`)"
				:alt="img.alt"
			/>
		</h-scroll-view>
		<p>{{ event.description }}</p>
		<div>
			<h2>Admission</h2>
			<p>{{ event.admission }}</p>
		</div>
		<div>
			<h2>Hosted at</h2>
			<card :object="poi" />
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
			buttonDesc: "About this Point of Interest",
		}
		return { event, poi }
	},
	data() {
		return { event: {}, poi: null }
	},
	head() {
		return {
			title: this.event.name,
			meta: [
				{
					hid: "description",
					name: "description",
					content: `${this.event.name} page`,
				},
			],
		}
	},
}
</script>

<style scoped>
h1 {
	margin: 0 0;
}

.date-label {
	margin: 0 0;
	color: var(--color-accent-dark);
	font-size: var(--font-size-heading);
}

.row {
	display: grid;
	grid-template-columns: 1fr;
	padding-bottom: var(--space-1);
}

p {
	white-space: pre-wrap;
}

@media only screen and (min-width: 840px) {
	.row {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
