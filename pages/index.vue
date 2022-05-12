<script>
export default {
	name: "IndexPage",
	data: () => ({
		pois: [],
	}),
	async fetch() {
		this.pois = await fetch("http://localhost:8000/api/").then((res) =>
			res.json()
		)
	},
	fetchOnServer: true,
	fetchKey: "all-events",
}
</script>

<template>
	<div>
		<ExampleTitle />
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

<style>
body {
	background-color: var(--color-bg-light);
}
</style>
