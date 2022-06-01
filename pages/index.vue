<script>
import HScrollView from "~/components/HScrollView.vue"
import GridView from "~/components/GridView.vue"

export default {
	name: "IndexPage",
	components: { HScrollView, GridView },
	async asyncData({ $axios }) {
		const res = await $axios.$get("/api")
		res.forEach((_) => (_.url = "/"))
		return { pois: res }
	},
	data: () => ({
		pois: [],
	}),
}
</script>

<template>
	<div>
		<h-scroll-view>
			<div
				v-for="x of [1, 2, 3, 4]"
				:key="x"
				style="height: 300px; background: red"
			>
				{{ x }}
			</div>
		</h-scroll-view>
		<grid-view>
			<div
				v-for="x of [1, 2, 3, 4, 5, 6, 7]"
				:key="x"
				style="height: 300px; background: green"
			>
				{{ x }}
			</div>
		</grid-view>
		<steps-navigator
			:prev-step="{
				url: `/pois/poi_x?itinerary=itinerary_x`,
				title: 'Very very very very very very very very very very very very very very very very very very very very very very very very long title',
				img: 'poi_spiaggia_dei_sassolini_01.jpg',
				label: 'Previous step in itinerary',
			}"
			:next-step="{
				url: `/pois/poi_y?itinerary=itinerary_x`,
				title: 'PoI Y',
				img: 'poi_spiaggia_dei_sassolini_01.jpg',
				label: 'Next step in itinerary',
			}"
		>
		</steps-navigator>
		<br />
		<steps-navigator
			:next-step="undefined"
			:prev-step="{
				url: `/pois/poi_y?itinerary=itinerary_x`,
				title: 'PoI Y',
				img: 'poi_spiaggia_dei_sassolini_01.jpg',
				label: 'Previous step in itinerary',
			}"
		>
		</steps-navigator>
	</div>
</template>
