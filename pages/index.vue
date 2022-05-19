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
				link: `/pois/poi_x?itinerary=itinerary_x`,
				title: 'Very very very very very very very very very very very very very very very very very very very very very very very very long title',
				url: 'https://media-cdn.tripadvisor.com/media/photo-s/04/9c/b9/b0/ponte-real-ferdinando.jpg',
				label: 'Previous step in itinerary',
			}"
			:next-step="{
				link: `/pois/poi_y?itinerary=itinerary_x`,
				title: 'PoI Y',
				url: 'https://t3.ftcdn.net/jpg/04/22/54/96/360_F_422549672_YBblFRWVwazeHgI8MYtgFlFNKfAHFiTe.jpg',
				label: 'Next step in itinerary',
			}"
		>
		</steps-navigator>
		<br />
		<steps-navigator
			:next-step="undefined"
			:prev-step="{
				link: `/pois/poi_y?itinerary=itinerary_x`,
				title: 'PoI Y',
				url: 'https://t3.ftcdn.net/jpg/04/22/54/96/360_F_422549672_YBblFRWVwazeHgI8MYtgFlFNKfAHFiTe.jpg',
				label: 'Previous step in itinerary',
			}"
		>
		</steps-navigator>
		<br />
		<steps-navigator
			:next-step="{
				link: `/pois/poi_x?itinerary=itinerary_x`,
				title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
				url: 'https://media-cdn.tripadvisor.com/media/photo-s/04/9c/b9/b0/ponte-real-ferdinando.jpg',
				label: 'Next step in itinerary',
			}"
			:prev-step="undefined"
		>
		</steps-navigator>
	</div>
</template>
