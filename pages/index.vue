<script>
import CardView from '~/components/CardView.vue'
export default {
	name: "IndexPage",
	components: { CardView },

	async asyncData({ $axios }) {
		const res = await $axios.$get("/api")

		return { pois: res }
	},

	data: () => ({
		pois: [],
	}),

	fetchOnServer: true,
	fetchKey: "all-events",
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
		<card-view
			:cards-list='[{"name":"Slifer the Sky Dragon","id":10000020},{"name":"Obelisk the Tormentor","id":10000000},{"name":"The Winged Dragon of Ra","id":10000010},{"name":"Soul Crossing","id":5253985},{"name":"Sun God Unification","id":77432167},{"name":"The Winged Dragon of Ra - Immortal Phoenix","id":10000090},{"name":"The Winged Dragon of Ra - Sphere Mode","id":10000080},{"name":"Thunderforce Attack","id":42469671},{"name":"Ultimate Divine-Beast","id":32247099},{"name":"Holactie the Creator of Light","id":10000040},{"name":"Magical Trick Mirror","id":85758066},{"name":"Soul Energy MAX!!","id":79339613},{"name":"Blaze Cannon","id":4059313}]'
		>
		</card-view>
	</div>
</template>
