<template>
	<article>
		<h1>{{ service_type.name }}</h1>
		<div
			class="banner-image"
			:style="getBackground()"
			:role="img"
			:aria-label="service_type.generic_alt"
		></div>
		<p>
			{{ service_type.description }}
		</p>

		<ul class="services">
			<li v-for="el of service_type.services" :key="el.id" class="row">
				<div class="column-image">
					<image-loader
						class="service-image"
						:src="el.image"
						:alt="el.imageAlt"
					/>
				</div>
				<div class="column-text">
					<h2>{{ el.name }}</h2>
					<p><b>Address:</b> {{ el.address }}</p>
					<p><b>Opening Hours:</b> {{ el.openingHours }}</p>
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
	methods: {
		getBackground() {
			return {
				backgroundImage: `linear-gradient(0deg, var(--color-light), rgba(214, 214, 177, 0)), url(${require("~/assets/images/" +
					this.service_type.generic_image)})`,
			}
		},
	},
}
</script>

<style scoped>
.banner-image {
	margin-top: var(--space-1);
	width: 100%;
	height: var(--image-highlight-height);
	border-radius: var(--border-radius);

	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}

.column-image {
	flex-basis: 17em;
	flex-grow: 0;
	min-width: 17em;
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
