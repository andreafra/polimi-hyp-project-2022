<template>
	<article>
		<span class="category">Itinerary</span>
		<h1>{{ itinerary.name }}</h1>
		<div
			:style="{
				backgroundImage: `url(${require('~/assets/images/' +
					itinerary.images[0].url)})`,
			}"
			:aria-label="itinerary.images[0].alt"
			role="img"
			class="banner-image"
		/>
		<p class="itinerary-info">
			<b>Duration: </b>{{ itinerary.duration }} <b>Distance: </b
			>{{ itinerary.distance }}
		</p>
		<p>{{ itinerary.description }}</p>
		<div class="map-container">
			<iframe class="map" :src="`${itinerary.map}`"></iframe>
		</div>
		<h2>Points of Interest in this Itinerary</h2>
		<h-scroll-view>
			<card v-for="obj of getPoIs()" :key="obj.id" :object="obj" />
		</h-scroll-view>
		<!-- TODO: ADD BOTTOM GROUP LINKS-->
		<steps-navigator
			:next-step="getNavigatorStep(nextStep)"
			:prev-step="getNavigatorStep(prevStep)"
		/>
	</article>
</template>

<script>
import HScrollView from "~/components/HScrollView.vue"
import Card from "~/components/Card.vue"
export default {
	name: "ItineraryPage",
	components: {
		HScrollView,
		Card,
	},
	async asyncData({ $axios, params }) {
		const res = await $axios.$get(`/api/itineraries/${params.id}`)
		res.pointsOfInterest.sort(
			(a, b) =>
				a.itinerary_poi.pointOfInterestIndex -
				b.itinerary_poi.pointOfInterestIndex
		)
		const itineraries = await $axios.$get(`/api/itineraries`)
		const curIndex = itineraries.map((_) => _.id).indexOf(res.id)
		const prevStep = curIndex > 0 ? itineraries[curIndex - 1] : undefined
		const nextStep =
			curIndex < itineraries.length - 1
				? itineraries[curIndex + 1]
				: undefined
		return { itinerary: res, prevStep, nextStep }
	},
	data() {
		return {
			itinerary: {},
			pois: [],
			prevStep: undefined,
			nextStep: undefined,
		}
	},
	head() {
		return { title: this.itinerary.name }
	},
	methods: {
		getPoIs() {
			return this.itinerary.pointsOfInterest.map((el) => ({
				title: el.name,
				img: el.images[0].url,
				alt: el.images[0].alt,
				description: el.description,
				url: `/pois/${el.id}?itinerary=${this.itinerary.id}`,
			}))
		},
		getNavigatorStep(step) {
			if (!step) return undefined

			return {
				url: `/itineraries/${step.id}`,
				title: step.name,
				img: step.images[0].url,
				label:
					step === this.nextStep
						? "Next Itinerary"
						: "Previous Itinerary",
			}
		},
	},
}
</script>

<style scoped>
.banner-image {
	display: block;
	margin: var(--space-1) 0;
	border-radius: var(--border-radius);
	background-color: var(--color-neutral);
	background-position: center;
	background-size: cover;
	aspect-ratio: 16 / 9;
	width: 100%;
	height: var(--image-highlight-height);
}

.itinerary-info {
	display: inline-block;
	border: 2px solid var(--color-neutral);
	border-radius: var(--border-radius);
	padding: var(--space-0);
	margin: var(--space-0) 0 0 0 !important;
	font-size: var(--font-size-category);
}

.map-container {
	aspect-ratio: 16 / 9;
	width: 100%;
	height: var(--image-highlight-height);
	overflow: hidden;
	border-radius: var(--border-radius);
}

.map {
	position: relative;
	border: none;
	width: 100%;
	height: 100%;
	border-radius: var(--border-radius);
}
</style>
