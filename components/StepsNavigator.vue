<template>
	<div class="steps-container">
		<nuxt-link
			v-if="prevStep"
			:to="prevStep.url"
			class="step prev-step"
			@load="getBackground(prevStep)"
		>
			<p class="step-label">{{ prevStep.label }}</p>
			<div class="step-box" :style="getBackground(prevStep)">
				<h3 class="step-title">{{ prevStep.title }}</h3>
				<arrow-left class="arrow" />
			</div>
		</nuxt-link>
		<div v-else class="empty"></div>
		<nuxt-link v-if="nextStep" :to="nextStep.url" class="step next-step">
			<p class="step-label">{{ nextStep.label }}</p>
			<div class="step-box" :style="getBackground(nextStep)">
				<h3 class="step-title">{{ nextStep.title }}</h3>
				<arrow-right class="arrow" />
			</div>
		</nuxt-link>
	</div>
</template>

<!-- FIXME: It would appear that (at least in development)
asyncData is called and $axios.$get returns `null` whenever the two buttons in steps-navigator are
re-rendered. The issue lies with steps-navigator. THIS IS BECAUSE NUXT-LINK TRIES TO PREFETCH
-->
<script>
import ArrowLeft from "./icons/ArrowLeft.vue"
import ArrowRight from "./icons/ArrowRight.vue"
export default {
	name: "StepsNavigator",
	components: { ArrowLeft, ArrowRight },
	props: {
		// eslint-disable-next-line vue/require-default-prop
		prevStep: { type: Object },
		// eslint-disable-next-line vue/require-default-prop
		nextStep: { type: Object },
	},
	mounted() {
		if (this.prevStep)
			this.$el.querySelector(
				".prev-step .step-box"
			).style.backgroundImage = `linear-gradient(0deg, var(--color-light), rgba(214, 214, 177, 0)), url("${this.prevStep.img}")`
		if (this.nextStep)
			this.$el.querySelector(
				".next-step .step-box"
			).style.backgroundImage = `linear-gradient(0deg, var(--color-light), rgba(214, 214, 177, 0)), url("${this.nextStep.img}")`
	},
	methods: {
		getBackground(step) {
			if (step)
				return {
					backgroundImage: `linear-gradient(0deg, var(--color-light), rgba(214, 214, 177, 0)), url("${step.img}")`,
				}
			else return {}
		},
	},
}
</script>

<style scoped>
.steps-container {
	position: relative;
	display: grid;
	grid-template-columns: var(--navigator-template-columns);

	background-color: var(--color-neutral);
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
}

.step {
	flex-grow: 1;
	flex-basis: 0;
	margin: 0 var(--space-0);
	display: inline-flex;
	flex-direction: column;
	text-decoration: none;
	padding: 0 0 var(--space-1);
}

.step .step-label {
	font-weight: bold;
	word-wrap: break-word;
	color: var(--color-light);
}

.step-box {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;

	border-radius: var(--border-radius);
	background-color: white;
	padding: 0 var(--space-1) var(--space-1);

	height: var(--navigator-step-height);

	overflow: hidden;

	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}

.step-title {
	margin: 0;
	font-family: var(--font-family-heading);
	color: var(--color-accent-dark);
}

.arrow {
	position: relative;
	color: var(--color-accent-dark);
	font-size: 1.4em;
	flex-shrink: 0;
}

.prev-step {
	margin-left: var(--space-1);
}

.next-step {
	margin-right: var(--space-1);
}

.prev-step .step-box {
	flex-direction: row-reverse;
}

.next-step .step-box {
	flex-direction: row;
}

.prev-step .step-title {
	text-align: right;
}

.next-step .step-title {
	text-align: left;
}

.prev-step .arrow {
	margin-right: 1em;
}

.next-step .arrow {
	margin-left: 1em;
}

@media only screen and (min-width: 840px) {
}
</style>
