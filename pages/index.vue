<script>
import HScrollView from "~/components/HScrollView.vue"
import Card from "~/components/Card.vue"
import Utils from "~/mixins/utils"

export default {
	name: "IndexPage",
	components: { HScrollView, Card },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const res = await $axios.$get("/api/events")
		return {
			events: res
				.sort((a, b) => new Date(a.date) - new Date(b.date))
				.slice(0, 3),
		}
	},
	data: () => ({
		events: [],
	}),
	head() {
		return {
			title: "Home",
			meta: [
				{
					hid: "description",
					name: "description",
					content: `Home page`,
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

<template>
	<div>
		<div class="welcome-image">
			<h1>Welcome to Minturno!</h1>
			<h2>
				A place with fascinating monuments, beautiful natural sceneries,
				delicious cuisine and more!
			</h2>
		</div>
		<h3>Take a look at our upcoming events:</h3>
		<h-scroll-view>
			<card
				v-for="event of getEvents()"
				:key="'event-index-' + event.id"
				:object="event"
			/>
		</h-scroll-view>
	</div>
</template>

<style scoped>
.welcome-image {
	margin-top: var(--space-1);
	padding: var(--space-0);
	width: 100%;
	height: 30em;
	border-radius: var(--border-radius);

	background-image: linear-gradient(
			0deg,
			var(--color-light),
			rgba(214, 214, 177, 0)
		),
		url("~/assets/images/home2.jpg?webp");

	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}

h1 {
	font-size: 3.5em;
	margin: 0 0;
}

h2 {
	color: var(--color-accent-dark);
	margin-top: 0;
	margin-bottom: var(--space-2);
}
</style>
