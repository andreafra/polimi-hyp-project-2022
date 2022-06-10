<template>
	<article>
		<span class="category">Itinerary</span>
		<h1>{{ itinerary.name }}</h1>
		<div
			:style="{
				backgroundImage: `url(${require('~/assets/images/' +
					itinerary.images[0].url)}?webp)`,
			}"
			:aria-label="itinerary.images[0].alt"
			role="img"
			class="banner-image"
		>
			<div class="itinerary-info">
				<b>Duration: </b>{{ formatDuration(itinerary.duration) }}
				<br />
				<b>Distance: </b>{{ formatDistance(itinerary.distance) }}
			</div>
		</div>
		<p>{{ itinerary.description }}</p>
		<map-container :map="itinerary.map" />
		<h2>Points of Interest in this Itinerary</h2>
		<h-scroll-view>
			<card v-for="obj of getPoIs()" :key="obj.id" :object="obj" />
		</h-scroll-view>
		<steps-navigator
			:next-step="getNavigatorStep(nextStep)"
			:prev-step="getNavigatorStep(prevStep)"
		/>
	</article>
</template>

<script>
import HScrollView from "~/components/HScrollView.vue"
import Card from "~/components/Card.vue"
import MapContainer from "~/components/MapContainer.vue"
import Utils from "~/mixins/utils"
export default {
	name: "ItineraryPage",
	components: {
		HScrollView,
		Card,
		MapContainer,
	},
	mixins: [Utils],
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
		return {
			title: this.itinerary.name,
			meta: [
				{
					hid: "description",
					name: "description",
					content: `${this.itinerary.name} page`,
				},
			],
		}
	},
	methods: {
		getPoIs() {
			return this.itinerary.pointsOfInterest.map((el) =>
				this.getCardPointOfInterest(el, this.itinerary.id)
			)
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
	height: 24em;
}

.itinerary-info {
	display: inline-block;
	background-color: var(--color-dark);
	border: 2px solid var(--color-neutral);
	color: var(--color-light);
	border-radius: var(--border-radius);
	padding: var(--space-1);
	margin: var(--space-0);
	font-size: var(--font-size-body);
}
.itinerary-info {
	line-height: 1.5;
}

.map-container {
	aspect-ratio: 16 / 9;
	width: 100%;
	height: 24em;
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
