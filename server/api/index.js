import Express from "express"
import { InitDatabaseConnection, Models } from "./database"

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

		res.json(events)
	})
})()
