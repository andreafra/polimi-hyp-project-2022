import itineraries from "./data/itineraries.json"
import pois from "./data/pois.json"
import services from "./data/service_types.json"
import itineraryPoIs from "./data/itinerary_pois.json"
import { Models } from "./database"

export async function InitDatabaseData() {
	await Models.PointOfInterest.bulkCreate(pois, {
		include: [
			{
				association: Models.Event,
			},
		],
	})
	await Models.Itinerary.bulkCreate(itineraries, {
		include: [Models.PointOfInterest],
	})
	await Models.ServiceType.bulkCreate(services)
	// await Models.ItineraryPoIs.bulkCreate(itineraryPoIs)
}
