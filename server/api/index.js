import Express from "express"
import { db, InitDatabaseConnection, Models } from "./database"
import { SeedDatabase } from "./seed"

// PLEASE NOTE:
// top level await is not supported in NodeJS
// so we must wrap it inside an async function

// Init Express
const app = Express()

// Enable JSON Express Middleware
// https://expressjs.com/en/api.html#express.json
app.use(Express.json())

// Export the Express instance so NuxtJS will use it
export default app

Init()

async function Init() {
	await InitDatabaseConnection()
	await SeedDatabase()

	// Setup sample route
	// consider that / means that will be matched to /api/
	// just as /stuff -> /api/stuff
	app.get("/", (req, res) => {
		console.log(req)
		res.send("GET request to the homepage")
	})
}
