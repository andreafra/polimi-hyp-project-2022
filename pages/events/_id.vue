<template>
	<article>
		<span class="category">Event</span>
		<h1>{{ event.name }}</h1>
		<h-scroll-view>
			<div
				v-for="(x, index) of event.images"
				:key="index"
				style="height: 300px; background: red"
			>
				{{ x }}
			</div>
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
<<<<<<< HEAD
	name: "EventPage",
	components: {
		HScrollView,
		Card,
	},
	async asyncData({ $axios, params }) {
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
=======
	name: "EventsPage",
	components: { Card, ButtonPrimary, HScrollView },
	async asyncData({ $axios, params }) {
		const invalidSeason = ![
			"winter",
			"spring",
			"summer",
			"autumn",
		].includes(params.id)
		const res = await $axios.$get(
			`/api/events${invalidSeason ? "" : "?season=" + params.id}`
		)
		res.forEach((_) => (_.url = `/event/${_.id}`))
		const activeButton = invalidSeason
			? "All"
			: params.id.replace(/^./, params.id[0].toUpperCase())
		return { events: res, activeButton }
	},
	data: () => ({
		events: [],
		activeButton: "",
		seasons: [
			{
				label: "All",
				link: "/events",
				desc: "All events that will be held at Minturno!",
			},
			{
				label: "Winter",
				link: "/events/winter",
				desc: "Winter events at Minturno, brr...",
			},
			{
				label: "Spring",
				link: "/events/spring",
				desc: "Spring events at Minturno, 🌼",
			},
			{
				label: "Summer",
				link: "/events/summer",
				desc: "Summer events at Minturno, ⛱️",
			},
			{
				label: "Autumn",
				link: "/events/autumn",
				desc: "Autumn events at minturno, 🍂",
			},
		],
	}),
>>>>>>> Use nuxt-link-exact-active
}
</script>

<style scoped>
.row {
	display: grid;
	grid-template-columns: 1fr;
}

<<<<<<< HEAD
=======
.season-button:hover {
	color: var(--color-dark) !important;
	background-color: var(--color-accent) !important;
}

a.nuxt-link-exact-active {
	color: var(--color-dark) !important;
	background-color: var(--color-accent) !important;
	cursor: auto;
}

/*Media query */
>>>>>>> Use nuxt-link-exact-active
@media only screen and (min-width: 840px) {
	.row {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
