import itineraries from "./data/itineraries.json"
import itineraryPoIs from "./data/itinerary_pois.json"
import pois from "./data/pois.json"
import services from "./data/service_types.json"
import { Models } from "./database"

/**
 * Populate the database with an initial set of data.
 *
 * @link https://en.wikipedia.org/wiki/Database_seeding
 */
export async function SeedDatabase() {
	// Seed ServiceTypes
	try {
		await Models.ServiceType.bulkCreate(services)
	} catch (error) {
		console.error("Couldn't initialize Service Types: ", error)
	}

	// Seed Events <-> PointsOfInterest
	try {
		// Sequelize doesn't support 'include' property on bulkCreate,
		// so we can't add one-to-many and many-to-many relationship in bulk.
		// See: https://github.com/sequelize/sequelize/issues/3277
		for (const poi of pois) {
			await Models.PointOfInterest.create(poi, {
				include: [
					{
						model: Models.Event,
						as: "events",
					},
				],
			})
		}
	} catch (error) {
		console.error(
			"Couldn't initialize Events <-> PointsOfInterest: ",
			error
		)
	}

	// Seed Itineraries <-> PointOfInterest
	try {
		await Models.Itinerary.bulkCreate(itineraries)
		await Models.ItineraryPoIs.bulkCreate(itineraryPoIs)
	} catch (error) {
		console.error(
			"Couldn't initialize Itineraries <-> PointOfInterest: ",
			error
		)
	}
}
