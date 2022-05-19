<script>
export default {
	name: "IndexPage",

	async asyncData({ $axios }) {
		const res = await $axios.$get("/api")

		return { pois: res }
	},

	data: () => ({
		pois: [],
	}),
}
</script>

<template>
	<div>
		<ul>
			<li v-for="poi of pois" :key="poi.id">
				{{ poi.name }}
				<p><i>Events:</i>
				<ul>
					<li v-for="event of poi.events" :key="event.id">
						{{ event.name }}
					</li>
				</ul>
				</p>
				<p><i>Itineraries through here:</i>
				<ul>
					<li v-for="itinerary of poi.itineraries" :key="itinerary.id">
						{{ itinerary.name }}
					</li>
				</ul>
				</p>
			</li>
		</ul>
	</div>
</template>
