<template>
	<img :src="require(`~/assets/images/${src}?webp`)" :alt="alt" />
</template>

<script>
export default {
	name: "ImageLoader",
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
}
</script>
