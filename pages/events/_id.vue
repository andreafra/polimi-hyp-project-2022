<template>
	<div>
		<h1>
			All
			<span v-if="activeButton !== 'All'">{{ activeButton }}</span> Events
		</h1>
		<p>
			{{ seasons.find((_) => _.label === activeButton).desc }}
		</p>
		<div id="desktop-container">
			<button-primary
				v-for="(season, index) of seasons"
				:key="`season-index-${index}`"
				:link="`${season.link}`"
				:title="season.label"
				class="season-button"
			/>
		</div>
		<h-scroll-view id="mobile-container">
			<button-primary
				v-for="(season, index) of seasons"
				:key="`season-index-${index}`"
				:link="`${season.link}`"
				:title="season.label"
				class="season-button"
			/>
		</h-scroll-view>
		<grid-view>
			<card
				v-for="(event, index) of events"
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
import HScrollView from "~/components/HScrollView.vue"
export default {
	name: "EventsPage",
	components: { Card, ButtonPrimary, HScrollView },
	async asyncData({ $axios, params, redirect }) {
		const invalidSeason =
			!["winter", "spring", "summer", "autumn"].includes(params.id) &&
			params.id !== "all"
		// Exploit for nuxt-link-active as /events is considered active in all group of topics pages
		// e.g. in /events/winter the nuxt-link /events will be considered active too
		if (invalidSeason) redirect("/events/all")
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
				link: "/events/all",
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
}
</script>

<style scoped>
h1 span {
	color: var(--color-accent-dark);
}

#mobile-container {
	display: flex;
	height: 10%; /* To solve a bug with opacity bars */
}

#desktop-container {
	display: none;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.season-button {
	color: var(--color-light) !important;
	background-color: var(--color-neutral) !important;
	border: 0px !important;
	margin: 0.1em 0.2em 0.2em 0.2em;
	width: 5.8em;
	text-align: center;
}

.season-button:hover {
	color: var(--color-dark) !important;
	background-color: var(--color-accent) !important;
}

a.nuxt-link-active {
	color: var(--color-dark) !important;
	background-color: var(--color-accent) !important;
	cursor: auto;
}

/*Media query */
@media only screen and (min-width: 840px) {
	#mobile-container {
		display: none;
	}

	#desktop-container {
		display: flex;
	}

	.season-button {
		width: 8.8em;
	}
}
</style>
