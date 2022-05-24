<template>
	<div>
		<h1>
			All
			<span v-if="activeButton !== 'All'">{{ activeButton }}</span> Events
		</h1>
		<p>
			{{ seasons.find((season) => season.label === activeButton).desc }}
		</p>
		<div class="seasons">
			<button-primary
				v-for="(season, index) of seasons"
				:key="`season-index-${index}`"
				:link="`${season.link}`"
				:title="season.label"
				class="season-button"
			/>
		</div>
		<grid-view>
			<card
				v-for="(event, index) of getEvents()"
				:key="'event-index-' + index"
				:object="event"
			/>
		</grid-view>
		<h3 v-if="events.length === 0">No events found</h3>
	</div>
</template>

<script>
import ButtonPrimary from "~/components/ButtonPrimary.vue"
import Card from "~/components/Card.vue"
export default {
	name: "EventsPage",
	components: { Card, ButtonPrimary },
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
		res.forEach((_) => (_.url = `/events/${_.id}`))
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
				link: "/events_all",
				desc: "All events that will be held at Minturno!",
			},
			{
				label: "Winter",
				link: "/events_all/winter",
				desc: "Winter events at Minturno, brr...",
			},
			{
				label: "Spring",
				link: "/events_all/spring",
				desc: "Spring events at Minturno, 🌼",
			},
			{
				label: "Summer",
				link: "/events_all/summer",
				desc: "Summer events at Minturno, ⛱️",
			},
			{
				label: "Autumn",
				link: "/events_all/autumn",
				desc: "Autumn events at minturno, 🍂",
			},
		],
	}),
	methods: {
		getEvents() {
			return this.events.map((event) => ({
				title: event.name,
				subtitle: `${event.date}`,
				img: event.images[0].url,
				alt: event.images[0].alt,
				description: event.description,
				url: `/events/${event.id}`,
			}))
		},
	},
}
</script>

<style scoped>
h1 span {
	color: var(--color-accent-dark);
}

.seasons {
	display: flex;
	overflow-x: scroll;
	scroll-behavior: smooth;
	padding-bottom: var(--space-y-1);
}

.season-button {
	color: var(--color-light);
	background-color: var(--color-neutral);
	border: 0px;
	margin-right: var(--space-y-0);
	flex-grow: 1;
	text-align: center;
}

.season-button:last-child {
	margin-right: 0;
}

.season-button:hover {
	color: var(--color-dark);
	background-color: var(--color-accent);
}

.season-button.nuxt-link-exact-active {
	color: var(--color-dark);
	background-color: var(--color-accent);
	cursor: auto;
}
</style>
