<!-- This component wraps the <img> to avoid repeating the webpack require code -->
<!-- There's also probably no need to need for the scope of this project
	 to implement it as a <picture> with responsive width images,
	 which is btw what nuxt-image does, but we don't use it since it's
	 technically a third-party custom component and therefore not allowed? -->
<template>
	<div class="image-loader">
		<img
			class="small-image"
			:src="require(`~/assets/images/${src}?webp`)"
			:alt="alt"
		/>
		<button
			class="modal-open"
			aria-label="fullscreen"
			@click="fullImage = !fullImage"
		>
			<full-screen-icon />
		</button>
		<transition name="fade">
			<div v-show="fullImage" class="modal">
				<button
					class="modal-close"
					aria-label="close-modal"
					@click="fullImage = !fullImage"
				>
					<x-icon />
				</button>
				<div class="modal-view">
					<img
						class="full-image"
						:src="require(`~/assets/images/${src}?webp`)"
						:alt="alt"
					/>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import XIcon from "./icons/XIcon.vue"
import FullScreenIcon from "./icons/FullScreenIcon.vue"
export default {
	name: "ImageLoader",
	components: { XIcon, FullScreenIcon },
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		fullImage: false,
	}),
}
</script>

<style scoped>
.image-loader {
	position: relative;
	width: 100%;
}

.modal-open {
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	right: var(--space-1);
	bottom: var(--space-1);

	color: var(--color-light);
	fill: var(--color-light);
	background-color: var(--color-darker);
	border: none;
	border-radius: 5px;
	padding: var(--space-0);
	font-size: var(--font-size-button);
}

.modal {
	background: #000;
	display: flex;
	height: 100%;
	left: 0;
	position: fixed;
	overflow: auto;
	top: 0;
	width: 100%;
	z-index: 9998;
}

.modal-close {
	position: absolute;
	right: var(--space-1);
	top: var(--space-1);
	z-index: 9999;

	background: none;
	border: none;
	cursor: pointer;
	color: var(--color-light);
	font-size: 3.5rem;
}

.modal-view {
	display: flex;
	margin: auto;
	position: relative;
	height: 90vmin;
}
</style>
