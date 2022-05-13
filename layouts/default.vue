<!-- eslint-disable vue/multi-word-component-names -->
<!-- This Layout will be applied by default to all pages -->
<template>
	<div class="wrapper">
		<page-header />
		<div class="content">
			<div class="container">
				<nuxt />
			</div>
		</div>
		<page-footer />
	</div>
</template>

<script>
export default {
	layout: "default",
}
</script>

<style>
body {
	font-family: var(--font-family-body);
	font-size: var(--font-size-body);
	background-color: var(--color-dark);
	margin: 0;
}

.wrapper {
	display: flex;
	flex-direction: column;
}

.content {
	background-color: var(--color-light);
}

.container {
	max-width: var(--max-width);
	margin: auto;
}
</style>
