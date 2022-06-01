<template>
	<div>
		<h1>All Services</h1>
		<p>
			Here's some of the services that are available right now in the
			town!
		</p>
		<grid-view>
			<card
				v-for="service of getGenericService()"
				:key="service.id"
				:object="service"
			/>
		</grid-view>
	</div>
</template>

<script>
import Card from "~/components/Card.vue"
import GridView from "~/components/GridView.vue"

export default {
	name: "AllServicesPage",
	components: { Card, GridView },
	async asyncData({ $axios }) {
		const res = await $axios.$get(`/api/services`)

		return { services: res }
	},
	data: () => ({
		services: [],
	}),

	methods: {
		getGenericService() {
			return this.services.map((service) => ({
				id: service.id,
				title: service.name,
				img: service.generic_image,
				alt: service.generic_alt,
				description: service.description,
				url: `/services/${service.id}`,
			}))
		},
	},
}
</script>
