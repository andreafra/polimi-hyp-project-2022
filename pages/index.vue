<script>
import HScrollView from "~/components/HScrollView.vue"
export default {
	name: "IndexPage",
	components: { HScrollView },
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
		<h-scroll-view>
			<div
				v-for="x of [1, 2, 3, 4]"
				:key="x"
				style="height: 300px; background: red"
			>
				{{ x }}
			</div>
		</h-scroll-view>
	</div>
</template>
