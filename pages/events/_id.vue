<template>
	<article>
		<span class="category">Event</span>
		<h1>{{ event.name }}</h1>
		<h-scroll-view>
			<div
				v-for="x of event.images"
				:key="x"
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
				<card :object="{ event, url: '/' }" />
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
		const res = await $axios.$get(`/api/events/${params.id}`)
		return { event: res }
	},
	data() {
		return { event: {} }
	},

	methods: {
		getPoI() {
			// how do I get the poi related to this event
		},
	},
}
</script>

<style scoped>
.row {
	display: flex;
}

.column {
	flex: 50%;
}
</style>
