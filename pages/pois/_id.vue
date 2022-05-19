<template>
	<div>
		<div v-if="comingItineary" class="back-link-container">
			<nuxt-link
				:to="`/itineraries/${comingItineary.id}`"
				class="back-link"
			>
				<arrow-left></arrow-left> &nbsp; Back to
				{{ comingItineary.name }}
			</nuxt-link>
		</div>
		<span class="category">Point of Interest</span>
		<h1>{{ poi.name }}</h1>
		<div class="flex-container">
			<h-scroll-view>
				<img
					v-for="(image, index) of poi.images"
					:key="`poi-image-index-${index}`"
					:src="image.url"
					:alt="image.alt"
				/>
			</h-scroll-view>
		</div>
		<p>{{ poi.description }}</p>
		<h2>Visit Information</h2>
		<p>{{ poi.visitInfo }}</p>
		<h2>Events hosted here</h2>
		<div class="flex-container">
			<h-scroll-view>
				<card
					v-for="(event, index) of getEvents()"
					:key="`poi-event-index-${index}`"
					:object="event"
				/>
			</h-scroll-view>
		</div>
		<h2>Itineraries passing through here</h2>
		<div class="flex-container">
			<h-scroll-view>
				<card
					v-for="(itinerary, index) of getItineraries()"
					:key="`poi-event-index-${index}`"
					:object="itinerary"
				/>
			</h-scroll-view>
		</div>
		<steps-navigator
			:next-step="getNavigatorStep(nextStep)"
			:prev-step="getNavigatorStep(prevStep)"
		>
		</steps-navigator>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"
import HScrollView from "~/components/HScrollView.vue"
import ArrowLeft from "~/components/icons/ArrowLeft.vue"
import StepsNavigator from "~/components/StepsNavigator.vue"
export default {
	name: "EventsPage",
	components: { Card, HScrollView, ArrowLeft, StepsNavigator },
	async asyncData({ $axios, params, query }) {
		const poi = await $axios.$get(`/api/pois/${params.id}`)
		const comingItineary = poi.itineraries.find(
			(_) => _.id === query.itinerary
		)
		if (comingItineary) {
			// In the DB the index in itinerary_poi starts from 1 and not 0
			const curPoiIndex =
				comingItineary.itinerary_poi.pointOfInterestIndex - 1
			const res = await $axios.$get(
				`/api/itineraries/${comingItineary.id}`
			)
			const itinearyPois = res.pointsOfInterest
			const prevStep =
				curPoiIndex > 0 ? itinearyPois[curPoiIndex - 1] : undefined
			const nextStep =
				curPoiIndex < itinearyPois.length - 1
					? itinearyPois[curPoiIndex + 1]
					: undefined
			return { poi, comingItineary, prevStep, nextStep }
		} else return { poi, comingItineary }
	},
	data: () => ({
		poi: {},
		comingItineary: undefined,
		prevStep: undefined,
		nextStep: undefined,
	}),
	methods: {
		getEvents() {
			return this.poi.events.map((event) => ({
				title: event.name,
				subtitle: `${event.date}`,
				img: event.images[0].url,
				alt: event.images[0].alt,
				description: event.description,
				url: `/events/${event.id}`,
			}))
		},
		getItineraries() {
			return this.poi.itineraries.map((itinerary) => ({
				title: itinerary.name,
				subtitle: `Duration ${itinerary.duration} | Length ${itinerary.distance}`,
				img: itinerary.images[0].url,
				alt: itinerary.images[0].alt,
				description: itinerary.description,
				url: `/itineraries/${itinerary.id}`,
			}))
		},
		getNavigatorStep(step) {
			if (step) {
				return {
					link: `/pois/${step.id}?itinerary=${this.comingItineary.id}`,
					title: step.name,
					url: step.images[0].url,
					label:
						step === this.nextStep
							? "Next step in Itinerary"
							: "Previous step in Itinerary",
				}
			} else return undefined
		},
	},
}
</script>

<style scoped>
.flex-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.back-link-container {
	margin-top: var(--space-y-1);
	margin-bottom: var(--space-y-1);
}

.back-link {
	font-size: var(--font-size-header-title);
	color: var(--color-accent);
	font-weight: bolder;
	text-decoration: none;

	display: flex;
	align-items: center;
}

.back-link:hover {
	color: var(--color-accent-dark);
}
</style>
