<template>
	<div>
		<h1>
			All
			<span v-if="currentSeason !== 'All'">{{ currentSeason }}</span>
			Events
		</h1>
		<p>
			{{
				seasonsLinks.find((season) => season.label === currentSeason)
					.desc
			}}
		</p>
		<div class="seasons">
			<nuxt-link
				v-for="season of seasonsLinks"
				:key="season.label"
				:to="{
					path: '/events',
					query: season.query ? { season: season.query } : undefined,
				}"
				class="season-button"
				@click.native="$fetch"
			>
				{{ season.label }}
			</nuxt-link>
		</div>
		<grid-view>
			<card
				v-for="event of getEvents()"
				:key="event.id"
				:object="event"
			/>
		</grid-view>
		<p v-if="events.length === 0">No events found</p>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"
import GridView from "~/components/GridView.vue"
import Utils from "~/mixins/utils"

export default {
	name: "EventsPage",
	components: { Card, GridView },
	mixins: [Utils],
	data: () => ({
		events: [],
		title: "",
		currentSeason: "All",
		seasonsLinks: [
			{
				label: "All",
				desc: "All events that will be held at Minturno!",
			},
			{
				label: "Winter",
				query: "winter",
				desc: "Winter events in Minturno ❄️",
			},
			{
				label: "Spring",
				query: "spring",
				desc: "Spring events in Minturno 🌼",
			},
			{
				label: "Summer",
				query: "summer",
				desc: "Summer events in Minturno ⛱️",
			},
			{
				label: "Autumn",
				query: "autumn",
				desc: "Autumn events in minturno 🍂",
			},
		],
	}),
	async fetch() {
		const season = this.$route.query.season

		const SEASONS = ["winter", "spring", "summer", "autumn"]
		const isSeasonInvalid = !SEASONS.includes(season)
		const res = await this.$axios.$get(
			`/api/events${isSeasonInvalid ? "" : "?season=" + season}`
		)

		res.forEach((event) => (event.url = `/events/${event.id}`))
		const currentSeason = isSeasonInvalid
			? "All"
			: season.replace(/^./, season.charAt(0).toUpperCase())
		const title =
			currentSeason !== "All" ? `${currentSeason} Events` : "All Events"

		this.events = res.sort((a, b) => new Date(a.date) - new Date(b.date))
		this.currentSeason = currentSeason
		this.title = title
	},
	fetchOnServer: true,
	fetchKey: "events",
	head() {
		return {
			title: this.title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: `${this.title} page`,
				},
			],
		}
	},
	methods: {
		getEvents() {
			return this.events.map(this.getCardEvent)
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
	overflow-x: auto;
	scroll-behavior: smooth;
	padding-bottom: var(--space-0);
}

.season-button {
	color: var(--color-light);
	background-color: var(--color-neutral);
	padding: var(--space-1);
	border: 0px;
	border-radius: var(--border-radius);
	margin-right: var(--space-0);
	flex-grow: 1;
	text-align: center;
	font-family: var(--font-family-heading);
	font-weight: bold;
	font-size: var(--font-size-season-button);
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
