<template>
	<article>
		<h1>{{ service_type.name }}</h1>

		<ul class="services">
			<li v-for="el of service_type.services" :key="el.id" class="row">
				<div class="column-image">
					<img
						class="service-image"
						:src="require(`~/assets/images/${el.image}`)"
						:alt="el.imageAlt"
					/>
				</div>
				<div class="column-text">
					<h2>{{ el.name }}</h2>
					<p>{{ el.address }}</p>
					<p>{{ el.openingHours }}</p>
				</div>
			</li>
		</ul>
	</article>
</template>

<script>
export default {
	name: "ServicePage",
	async asyncData({ $axios, params }) {
		const res = await $axios.$get(`/api/services/${params.id}`)
		return { service_type: res }
	},
	data() {
		return { service_type: {} }
	},
}
</script>

<style scoped>
.column-image {
	flex-basis: 7em;
	flex-grow: 0;
	min-width: 7em;
	vertical-align: top;
}

.column-text {
	vertical-align: top;
	margin-left: var(--space-1);
}

.column-text h2 {
	margin-top: 0;
}
.service-image {
	width: 100%;
	border-radius: var(--border-radius);
}
.services {
	list-style: none;
	padding: 0;
}
.row {
	display: flex;
	margin-bottom: var(--space-1);
}

@media only screen and (min-width: 840px) {
	.row {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
