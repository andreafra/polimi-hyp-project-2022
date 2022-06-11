<template>
	<div class="scroll-view">
		<transition name="fade">
			<div
				v-if="isPrevVisible"
				class="opacity-bar-left"
				aria-hidden="true"
			></div>
		</transition>
		<transition name="fade">
			<div
				v-if="isPrevVisible"
				class="prev"
				aria-hidden="true"
				@click="clickToScroll('prev')"
			>
				<ArrowLeft />
			</div>
		</transition>
		<div
			ref="container"
			class="scroll-snap-container"
			@scroll="handleScroll()"
		>
			<slot />
		</div>

		<transition name="fade">
			<div
				v-if="isNextVisible"
				class="opacity-bar-right"
				aria-hidden="true"
			></div>
		</transition>
		<transition name="fade">
			<div
				v-if="isNextVisible"
				class="next"
				aria-hidden="true"
				@click="clickToScroll('next')"
			>
				<ArrowRight />
			</div>
		</transition>
	</div>
</template>

<script>
import ArrowLeft from "./icons/ArrowLeft.vue"
import ArrowRight from "./icons/ArrowRight.vue"

export default {
	name: "HScrollView",
	components: { ArrowLeft, ArrowRight },

	data: () => ({
		// Use local state to dynamically toggle element visibility
		// instead of using selectors and CSS. Set defaults here.
		isPrevVisible: false,
		isNextVisible: false,
	}),

	mounted() {
		this.handleScroll()
		window.addEventListener("resize", this.handleScroll, false)
	},

	// See Vue Issue: https://github.com/vuejs/vue/issues/1915
	beforeUnmount() {
		window.removeEventListener("resize", this.handleScroll, false)
	},

	methods: {
		clickToScroll(to) {
			// Use refs instead of using querySelector.
			// A ref gets binded to the HTML element after the
			// component is mounted.
			// https://vuejs.org/guide/essentials/template-refs.html
			const container = this.$refs.container
			// When used in a v-for, (multiple identical refs) it returns an array
			const elem = this.$el.querySelector(".scroll-snap-container > *")

			if (to === "prev") {
				container.scrollLeft -= elem.offsetWidth
			} else {
				container.scrollLeft += elem.offsetWidth
			}
		},

		// Determines visibility of button arrows <- / ->
		handleScroll() {
			const container = this.$refs.container

			if (container === undefined) return

			this.isPrevVisible = container.scrollLeft > 0
			// The sum amounts to zero when the container is scrolled to the right end
			// scrollWidth = full scrollable length
			// scrollLeft = how much you have scrolled from the left
			// offsetWidth = basically the remaining width :)
			this.isNextVisible =
				container.scrollWidth -
				container.scrollLeft -
				container.offsetWidth
		},
	},
}
</script>

<style scoped>
@import "@/assets/styles/animations.css";

.scroll-view {
	display: flex;
	position: relative;
	margin: var(--space-1) 0;

	/* Local variables  */
	--scroll-button-size: 3rem;
}

/* Prev/Next Buttons */
.prev,
.next {
	display: flex;
	position: absolute;
	cursor: pointer;
	align-self: center;
	justify-content: center;

	color: var(--color-light);

	height: var(--scroll-button-size);
	width: var(--scroll-button-size);

	background-color: var(--color-light);
	border-radius: 50%;
	border: 2px solid var(--color-accent);
	padding: 0.5em;

	box-shadow: 0 6px 12px var(--color-accent-dark);

	transition: all 0.1s ease;

	/* Prevent double-tap to zoom on touchscreens */
	touch-action: manipulation;

	z-index: 1;
}
.prev svg,
.next svg {
	color: var(--color-accent);
	height: calc(var(--scroll-button-size) * 0.5);
	width: calc(var(--scroll-button-size) * 0.5);
	align-self: center;
}

.prev {
	left: calc(-1 * var(--space-0));
}
.next {
	right: calc(-1 * var(--space-0));
}

/*Container and scrollbar styles */
.scroll-snap-container {
	display: flex;
	width: 100%;
	overflow-x: auto;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;

	padding: 0;
}

/* Elements and opacity bars styles */
.scroll-snap-container > * {
	scroll-snap-align: center;
	scroll-margin-left: 0;
	min-width: 16em;
	margin-right: 1em;
}
.scroll-snap-container > *:last-child {
	margin-right: 0;
}

/* Styles for images */
/* Scoped styles conflict, see https://stackoverflow.com/questions/61939898/why-does-the-scoped-styles-are-not-being-loaded-in-nuxt-page 
	and https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
.scroll-snap-container >>> div img.small-image {
	height: var(--image-highlight-height);
	border-radius: var(--border-radius);
	background-color: var(--color-neutral);
	object-fit: cover;
}

.opacity-bar-right,
.opacity-bar-left {
	position: absolute;
	width: 2em;
	height: 100%;

	z-index: 1;
}
.opacity-bar-right {
	right: -0.15em;
	background: linear-gradient(
		270deg,
		var(--color-light) 35.53%,
		rgba(214, 214, 177, 0) 100%
	);
}

.opacity-bar-left {
	left: -0.15em;
	background: linear-gradient(
		90deg,
		var(--color-light) 0%,
		rgba(214, 214, 177, 0) 100%
	);
}

/*Media query */
@media only screen and (min-width: 840px) {
	.scroll-view {
		/* Local variables override */
		--scroll-button-offset-multiplier: -0.5;
	}

	.scroll-snap-container > * {
		scroll-snap-align: start;
		/* Offset from the align ('start' in this case) */
		scroll-margin-left: var(--scroll-button-size);
	}

	.prev {
		left: calc(-0.25 * var(--scroll-button-size));
	}
	.next {
		right: calc(-0.25 * var(--scroll-button-size));
	}
}
</style>
