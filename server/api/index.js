import Express from "express"
import { db, InitDatabaseConnection, Models } from "./database"
import { SeedDatabase } from "./seed"
import pg from "pg"

// Postgres on Heroku requires SSL to be active
pg.defaults.ssl = process.env.NODE_ENV === "production"

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
	await SeedDatabase()

	console.warn("Initialize API endpoints...")
	// Setup sample route
	// consider that / means that will be matched to /api/
	// just as /stuff -> /api/stuff
	app.get("/", (req, res) => {
		console.log(req)
		res.send("GET request to the homepage")
	})
})()
