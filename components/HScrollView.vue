<template>
	<div class="scroll-view">
		<transition name="fade">
			<div
				v-show="isPrevVisible"
				class="opacity-bar-left"
				aria-hidden="true"
			></div>
		</transition>
		<transition name="fade">
			<button
				v-show="isPrevVisible"
				class="prev"
				aria-hidden="true"
				@click="clickToScroll('prev')"
			>
				<ArrowLeft />
			</button>
		</transition>
		<div
			ref="container"
			class="scroll-snap-container"
			@scroll="handleScroll()"
			@mousewheel="wheelScroll"
		>
			<slot />
		</div>

		<transition name="fade">
			<div
				v-show="isNextVisible"
				class="opacity-bar-right"
				aria-hidden="true"
			></div>
		</transition>
		<transition name="fade">
			<button
				v-show="isNextVisible"
				class="next"
				aria-hidden="true"
				@click="clickToScroll('next')"
			>
				<ArrowRight />
			</button>
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
		isNextVisible: true,
	}),
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
		wheelScroll(e) {
			e.preventDefault()
			const container = this.$refs.container
			const elem = this.$el.querySelector(".scroll-snap-container > *")

			container.scrollLeft += elem.offsetWidth * Math.sign(e.deltaY)
		},
		handleScroll() {
			const container = this.$refs.container

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
@import "@/assets/styles/containers.css";

.scroll-view {
	display: flex;
	position: relative;
	margin: var(--space-y-1) 0;

	/* Local variables  */
	--scroll-button-size: 3rem;
	--scroll-button-offset-multiplier: 0;
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
}
.prev svg,
.next svg {
	color: var(--color-accent);
	height: calc(var(--scroll-button-size) * 0.5);
	width: calc(var(--scroll-button-size) * 0.5);
}

.prev {
	left: calc(
		var(--scroll-button-size) * var(--scroll-button-offset-multiplier)
	);
}
.next {
	right: calc(
		var(--scroll-button-size) * var(--scroll-button-offset-multiplier)
	);
}

.prev:active {
	margin-left: -0.5em;
}
.next:active {
	margin-right: -0.5em;
}

/*Container and scrollbar styles */
.scroll-snap-container {
	display: flex;
	overflow-x: auto;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;

	padding: 0;
}

::-webkit-scrollbar-thumb {
	background: var(--color-neutral);
}

::-webkit-scrollbar-thumb:hover {
	background: var(--color-dark);
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

.opacity-bar-right,
.opacity-bar-left {
	position: absolute;
	width: 2em;
	height: 100%;
}
.opacity-bar-right {
	right: -0.15em;
	background: linear-gradient(
		270deg,
		var(--color-light) 0%,
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
}
</style>
