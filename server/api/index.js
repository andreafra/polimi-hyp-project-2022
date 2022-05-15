import Express from "express"
import { InitDatabaseConnection, Models, db } from "./database"
import { Op } from "sequelize";

// Init Express
const app = Express()

// Enable JSON Express Middleware
// https://expressjs.com/en/api.html#express.json
app.use(Express.json())

// Export the Express instance so NuxtJS will use it
export default app

/* PLEASE NOTE:
 * top level await is not supported in NodeJS
 * so we must wrap it inside an async function
 *
 * Use a... I forgot what it's called. Closure? I don't remember :D
 * Anyway, it's a oneliner to avoid a Init() function.
 */
;(async () => {
	await InitDatabaseConnection()

	console.warn("Initialize API endpoints...")
	// Setup sample route
	// consider that / means that will be matched to /api/
	// just as /stuff -> /api/stuff
	app.get("/", async (req, res) => {
		const events = await Models.PointOfInterest.findAll({
			include: ["events", "itineraries"],
		})
		return res.json(events);
	});

	app.get("/events", async (req,res) => {
		const season = req.query.season?.toLowerCase();
		if(season != undefined && ["spring", "summer", "autumn", "winter"].includes(season)) {
			const seasonInterval = {
				"spring": ["03-21","06-20"],
				"summer": ["06-21","09-22"],
				"autumn": ["09-23","12-21"]
			}
			if(season !== 'winter') {
				const events = await Models.Event.findAll({
					where: db.where(
						db.literal('substring(cast(date as varchar), 6)'),
						{[Op.between]: seasonInterval[season]}
					),
					include: ["pointOfInterest"]
				});
				return res.json(events);
			}
			else { //winter date between [12-21,12-31] OR  beetween [01-01,03-20]
				const events = await Models.Event.findAll({
					where: db.where(
						db.literal('substring(cast(date as varchar), 6)'),
						{[Op.or]: {[Op.between]: ['12-21','12-31'], [Op.between]: ['01-01','03-20']}}
					),
					include: ["pointOfInterest"]
				});
				return res.json(events);
			}
		}
		else {
			const events = await Models.Event.findAll({
				include: ["pointOfInterest"]
			});
			return res.json(events);
		}
	});

	app.get("/events/:id", async (req, res) => {
        const id = req.params.id;
        const event = await Models.Event.findOne({
			where: { id },
			include: ["pointOfInterest"]		
		});
        return res.json(event);
    });

	app.get("/itineraries", async (req,res) => {
		const itineraries = await Models.Itinerary.findAll({
			include: ["pointsOfInterest"]
		});
		return res.json(itineraries);
	});

	app.get("/itineraries/:id", async (req,res) => {
		const id = req.params.id;
		const itinerary = await Models.Itinerary.findOne({
			where: { id },
			include: ["pointsOfInterest"]
		});
		return res.json(itinerary);
	});

	app.get("/pois", async (req,res) => {
		const pois = await Models.PointOfInterest.findAll({
			include: ["events", "itineraries"]
		});
		return res.json(pois);
	});

	app.get("/pois/:id", async (req,res) => {
		const id = req.params.id;
		const poi = await Models.PointOfInterest.findOne({
			where: { id },
			include: ["events", "itineraries"]
		});
		return res.json(poi);
	});

	app.get("/services", async (req,res) => {
		const services = await Models.ServiceType.findAll();
		return res.json(services);
	});

	app.get("/services/:id", async (req,res) => {
		const id = req.params.id;
		const service = await Models.ServiceType.findOne({ where: { id } });
		return res.json(service);
	});

	/*
/api/search?=<query> to search for a query (add a fuzzy search to get more results?)
	*/


})()
