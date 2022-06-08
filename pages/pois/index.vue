<template>
	<div>
		<h1>All Points of Interest</h1>
		<p>
			Here's all the Points of Interest that are available right now in
			the town!
		</p>
		<grid-view>
			<card v-for="poi of getPoIs()" :key="poi.id" :object="poi" />
		</grid-view>
		<h3 v-if="pois.length === 0">No pois found!</h3>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"
import GridView from "~/components/GridView.vue"
import Utils from "~/mixins/utils"

export default {
	name: "AllPoisPage",
	components: { Card, GridView },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const res = await $axios.$get(`/api/pois`)

		return { pois: res }
	},
	data: () => ({
		pois: [],
	}),
	head() {
		return {
			title: "Points of Interest",
			meta: [
				{
					hid: "description",
					name: "description",
					content: `All points of interest page`,
				},
			],
		}
	},
	methods: {
		getPoIs() {
			return this.pois.map(this.getCardPointOfInterest)
		},
	},
}
</script>
