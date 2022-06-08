<!-- This component wraps the <img> to avoid repeating the webpack require code -->
<!-- There's also probably no need to need for the scope of this project
	 to implement it as a <picture> with responsive width images,
	 which is btw what nuxt-image does, but we don't use it since it's
	 technically a third-party custom component and therefore not allowed? -->
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
