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
	</div>
</template>
