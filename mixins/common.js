export default {
	methods: {
		formatDistance(meters) {
			return Math.round((meters / 1000) * 100) / 100 + " Km"
		},
		formatDuration(seconds) {
			seconds = Number(seconds)
			const d = Math.floor(seconds / (3600 * 24))
			// const h = Math.floor((seconds % (3600 * 24)) / 3600)
			const h = Math.round(((seconds % (3600 * 24)) / 3600) * 100) / 100

			const dDisplay = d > 0 ? d + (d === 1 ? " Day " : " Days ") : ""
			const hDisplay = h > 0 ? h + (h === 1 ? " Hour " : " Hours ") : ""
			return dDisplay + hDisplay
		},
	},
}
