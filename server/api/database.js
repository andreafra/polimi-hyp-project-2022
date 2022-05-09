import { Sequelize, DataTypes as DT } from "sequelize"

// Create instance of Sequelize ORM
export const db = new Sequelize(process.env.DATABASE_URL)

const Event = db.define("Event", {
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
})

const PointOfInterest = db.define("PointOfInterest", {
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
})

const Itinerary = db.define("Itinerary", {
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
})

const ServiceType = db.define("ServiceType", {
	name: {
		type: DT.STRING,
		allowNull: false,
		primaryKey: true,
	},
	listOfServices: {
		type: DT.STRING(1024 * 8),
		allowNull: false,
	},
})

// Associations:

// Make a Junction Table between Itinerary and PoI
// to be used for a Many-To-Many relationship
const ItineraryPoIs = db.define("ItineraryPoIs", {
	ItineraryName: {
		type: DT.STRING,
		references: {
			model: Itinerary,
			key: "name",
		},
	},
	PointOfInterestName: {
		type: DT.STRING,
		references: {
			model: PointOfInterest,
			key: "name",
		},
	},
	PointOfInterestIndex: {
		type: DT.INTEGER,
		allowNull: false,
	},
})

// One-To-Many
PointOfInterest.hasMany(Event)
Event.belongsTo(PointOfInterest)

// Many-To-Many
// Will create a juction table called 'PointOfInterestItinerary'
Itinerary.belongsToMany(PointOfInterest, {
	through: ItineraryPoIs,
})
PointOfInterest.belongsToMany(Itinerary, {
	through: ItineraryPoIs,
})

/**
 * Instace as:
 * ----------------
 * PoI --> Events[]
 * Itinerary --> PoI (just the name)
 */

// Export models so we can access them
// in the rest of the backend codebase
// to create/update data
export const Models = {
	Event,
	Itinerary,
	// ItineraryPoIs,
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
		await db.sync({ force: process.env.DATABASE_DROP_ON_STARTUP })
	} catch (error) {
		console.error("Failed to initialize models: ", error)
	}
}
