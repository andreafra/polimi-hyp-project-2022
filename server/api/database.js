import { Sequelize, DataTypes as DT } from "sequelize"

// Create instance of Sequelize ORM
export const db = new Sequelize(process.env.DATABASE_URL, {
	logging: false,
})

const Event = db.define(
	"event",
	{
		name: {
			type: DT.STRING,
			allowNull: false,
			primaryKey: true,
		},
		images: {
			type: DT.ARRAY(DT.STRING),
			allowNull: false,
		},
		description: {
			type: DT.STRING(2048),
			allowNull: false,
		},
		date: {
			type: DT.DATEONLY,
			allowNull: false,
		},
		admission: {
			type: DT.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

const PointOfInterest = db.define(
	"point_of_interest",
	{
		name: {
			type: DT.STRING,
			allowNull: false,
			primaryKey: true,
		},
		images: {
			type: DT.ARRAY(DT.STRING),
			allowNull: false,
		},
		description: {
			type: DT.STRING(2048),
			allowNull: false,
		},
		locationX: {
			type: DT.FLOAT,
			allowNull: false,
		},
		locationY: {
			type: DT.FLOAT,
			allowNull: false,
		},
		visitInfo: {
			type: DT.STRING(1024),
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

const Itinerary = db.define(
	"itinerary",
	{
		name: {
			type: DT.STRING,
			allowNull: false,
			primaryKey: true,
		},
		images: {
			type: DT.ARRAY(DT.STRING),
			allowNull: false,
		},
		description: {
			type: DT.STRING,
			allowNull: false,
		},
		duration: {
			type: DT.FLOAT,
			allowNull: false,
		},
		distance: {
			type: DT.FLOAT,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

const ServiceType = db.define(
	"service_type",
	{
		name: {
			type: DT.STRING,
			allowNull: false,
			primaryKey: true,
		},
		listOfServices: {
			type: DT.STRING(1024 * 8),
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

// Make a Junction Table between Itinerary and PoI
// to be used for a Many-To-Many relationship
const ItineraryPoIs = db.define(
	"itinerary_poi",
	{
		pointOfInterestIndex: {
			type: DT.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
)

// One-To-Many
PointOfInterest.hasMany(Event, {
	as: "events",
})
Event.belongsTo(PointOfInterest, {
	// will rename the foreign ref. column in table 'events'
	as: "pointOfInterest",
})

// Many-To-Many
// Will create a juction table called 'PointOfInterestItinerary'
Itinerary.belongsToMany(PointOfInterest, {
	through: ItineraryPoIs,
	as: "pointsOfInterest",
})
PointOfInterest.belongsToMany(Itinerary, {
	through: ItineraryPoIs,
	as: "itineraries",
})

// Export models so we can access them
// in the rest of the backend codebase
// to perform queries
export const Models = {
	Event,
	Itinerary,
	ItineraryPoIs,
	PointOfInterest,
	ServiceType,
}

/**
 * Start Database Connection.
 * Must be called to sync the db status to ORM
 */
export async function InitDatabaseConnection() {
	try {
		await db.authenticate()
		console.log("Connection has been established successfully.")
	} catch (error) {
		console.error("Unable to connect to the database: ", error)
	}
	try {
		if (!process.env.DATABASE_WIPE) {
			console.warn(
				"DATABASE_WIPE is not set in Environment: will default to false."
			)
		} else {
			console.warn("Wiping Database...")
		}
		await db.sync({ force: process.env.DATABASE_WIPE ?? false })
	} catch (error) {
		console.error("Failed to initialize models: ", error)
	}
}
