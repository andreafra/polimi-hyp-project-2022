<template>
	<div class="steps-container">
		<div v-if="prevStep" class="prev-step">
			<p>{{ prevStep.label }}</p>
			<button-primary
				v-if="prevStep"
				:link="prevStep.link"
				:title="prevStep.title"
				class="button-step"
			>
			</button-primary>
			<arrow-left class="arrow"> </arrow-left>
		</div>
		<div v-if="nextStep" class="next-step">
			<p>{{ nextStep.label }}</p>
			<button-primary
				:link="nextStep.link"
				:title="nextStep.title"
				class="button-step"
			>
			</button-primary>
			<arrow-right class="arrow"> </arrow-right>
		</div>
	</div>
</template>

<script>
import ButtonPrimary from "./ButtonPrimary.vue"
import ArrowLeft from "./icons/ArrowLeft.vue"
import ArrowRight from "./icons/ArrowRight.vue"
export default {
	name: "StepsNavigator",
	components: { ButtonPrimary, ArrowLeft, ArrowRight },
	props: {
		// eslint-disable-next-line vue/require-default-prop
		prevStep: { type: Object },
		// eslint-disable-next-line vue/require-default-prop
		nextStep: { type: Object },
	},
	mounted() {
		//  document.querySelector(".prev-step").style.backgroundImage
		if (this.prevStep)
			this.$el.querySelector(
				".prev-step .button-step"
			).style.backgroundImage = `linear-gradient(0deg, var(--color-light), rgba(214, 214, 177, 0)), url("${this.prevStep.url}")`
		if (this.nextStep)
			this.$el.querySelector(
				".next-step .button-step"
			).style.backgroundImage = `linear-gradient(0deg, var(--color-light), rgba(214, 214, 177, 0)), url("${this.nextStep.url}")`
	},
}
</script>

<style scoped>
.steps-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-neutral);
	flex-wrap: wrap;
}

.prev-step p,
.next-step p {
	font-weight: bolder;
	word-wrap: break-word;
}

.prev-step,
.next-step {
	display: flex;
	flex-direction: column;
	width: 95%;
	margin-bottom: var(--space-y-1);
}

.button-step {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: var(--space-y-1);
	height: 7em;

	color: var(--color-accent-dark);
	opacity: 0.8;
	border: 0;

	word-wrap: break-word;
	overflow: hidden;

	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}

.button-step:hover {
	opacity: 1;
}

.prev-step .button-step {
	text-align: right;
}

.next-step .button-step {
	text-align: left;
}

.arrow {
	color: var(--color-accent-dark);
	position: absolute;
	margin-top: 6.2em;
	font-size: 1.4rem;
}

.next-step .arrow {
	right: 1.5em;
}

.prev-step .arrow {
	left: 1.5em;
}

@media only screen and (min-width: 840px) {
	.prev-step,
	.next-step {
		display: flex;
		flex-direction: column;
		width: 47%;
	}

	.prev-step {
		margin-right: auto;
		margin-left: var(--space-y-1);
	}

	.next-step {
		margin-left: auto;
		margin-right: var(--space-y-1);
	}
}
</style>
