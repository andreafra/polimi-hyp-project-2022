import itineraries from "./data/itineraries.json"
import itineraryPoIs from "./data/itinerary_pois.json"
import pois from "./data/pois.json"
import services from "./data/service_types.json"
import { Models } from "./database"

function convertToId(string) {
	return string
		.toLowerCase()
		.replaceAll(/['":]/g, "") // Remove special chars
		.replaceAll(/\s+/g, "_") // Remove multiple whitespaces
		.replaceAll(/^_|_$/g, "") // Remove "_" at the start and end of string
}

/**
 * Populate the database with an initial set of data.
 * Since we generate a URL friendly ID for each table,
 * we don't need to type it manually each time, so we
 * use map to append an 'id' field to each seed entry.
 *
 * @link https://en.wikipedia.org/wiki/Database_seeding
 */
export async function SeedDatabase() {
	// Seed ServiceTypes
	try {
		await Models.ServiceType.bulkCreate(
			services.map((a) => {
				return { ...a, id: convertToId(a.name) }
			})
		)
	} catch (error) {
		console.error("Couldn't initialize Service Types: ", error)
	}

	// Seed Events <-> PointsOfInterest
	try {
		// Sequelize doesn't support 'include' property on bulkCreate,
		// so we can't add one-to-many and many-to-many relationship in bulk.
		// See: https://github.com/sequelize/sequelize/issues/3277
		for (const poi of pois) {
			const poiWithId = {
				...poi,
				id: convertToId(poi.name),
				events: poi.events.map((a) => {
					return { id: convertToId(a.name), ...a }
				}),
			}

			await Models.PointOfInterest.create(poiWithId, {
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
		await Models.Itinerary.bulkCreate(
			itineraries.map((a) => {
				return { ...a, id: convertToId(a.name) }
			})
		)
		await Models.ItineraryPoIs.bulkCreate(
			itineraryPoIs.map((a) => {
				return {
					...a,
					itineraryId: convertToId(a.itineraryId),
					pointOfInterestId: convertToId(a.pointOfInterestId),
				}
			})
		)
	} catch (error) {
		console.error(
			"Couldn't initialize Itineraries <-> PointOfInterest: ",
			error
		)
		console.error(
			"If the error is about violation of the foreing key constraint, you probably spelled wrong the IDs of itinerary and PoI."
		)
	}
}
