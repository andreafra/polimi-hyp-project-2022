import Express from "express"
import { Sequelize } from "sequelize"

// Init Express
const app = Express()

// Export the Express instance so NuxtJS will use it
export default app

// Init Sequelize ORM
const db = new Sequelize(process.env.DATABASE_URL)

// Start Sequelize
// BTW: top level await is not supported in NodeJS
// 		so we must wrap it inside an async function
async function TestDatabaseConnection() {
	try {
		await db.authenticate()
		console.log("Connection has been established successfully.")
	} catch (error) {
		console.error("Unable to connect to the database:", error)
	}
}

TestDatabaseConnection()

// Enable JSON Express Middleware
// https://expressjs.com/en/api.html#express.json
app.use(Express.json())

// Setup sample route
// consider that / means that will be matched to /api/
// just as /stuff -> /api/stuff
app.get("/", (req, res) => {
	console.log(req)
	res.send("GET request to the homepage")
})
