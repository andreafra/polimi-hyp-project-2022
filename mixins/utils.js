export default {
	methods: {
		formatDistance(meters) {
			return Math.round((meters / 1000) * 100) / 100 + " Km"
		},
		formatDuration(seconds) {
			seconds = Number(seconds)
			const d = Math.floor(seconds / (3600 * 24))
			// const h = Math.floor((seconds % (3600 * 24)) / 3600)
			const h = Math.round(((seconds % (3600 * 24)) / 3600) * 100) / 100

			const dDisplay = d > 0 ? d + (d === 1 ? " Day " : " Days ") : ""
			const hDisplay = h > 0 ? h + (h === 1 ? " Hour " : " Hours ") : ""
			return dDisplay + hDisplay
		},
		// These methods convert data retrieved from the database to an object
		// to be passed as prop to the Card component
		getCardEvent(event) {
			return {
				id: event.id,
				title: event.name,
				subtitle: `${new Date(event.date).toLocaleDateString("en-GB", {
					dateStyle: "short",
				})}`,
				img: event.images[0].url,
				alt: event.images[0].alt,
				description: event.description,
				url: `/events/${event.id}`,
				buttonDesc: "About this Event",
			}
		},
		getCardItinerary(itinerary) {
			return {
				title: itinerary.name,
				subtitle: `Duration ${this.formatDuration(
					itinerary.duration
				)} | Length ${this.formatDistance(itinerary.distance)}`,
				img: itinerary.images[0].url,
				alt: itinerary.images[0].alt,
				description: itinerary.description,
				url: `/itineraries/${itinerary.id}`,
				buttonDesc: "About this Itinerary",
			}
		},
		getCardPointOfInterest(poi, itineraryId) {
			const itinerary = itineraryId ? `?itinerary=${itineraryId}` : ""
			return {
				title: poi.name,
				img: poi.images[0].url,
				alt: poi.images[0].alt,
				description: poi.description,
				url: `/pois/${poi.id}${itinerary}`,
				buttonDesc: "About this Place",
			}
		},
	},
}
