<!-- eslint-disable vue/multi-word-component-names -->
<!-- This Layout will be applied by default to all pages -->
<template>
	<div class="wrapper">
		<page-header />
		<div class="content">
			<main class="container">
				<nuxt />
			</main>
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
	min-height: 75vh;
}

.container {
	max-width: var(--max-width);
	margin: auto;
	padding: 0 var(--space-1);
}
</style>
