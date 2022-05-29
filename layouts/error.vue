<template>
	<div>
		<h1 v-if="error.statusCode === 404">Page not found</h1>
		<h1 v-else>An error occurred</h1>
		<NuxtLink to="/">Back to Home page</NuxtLink>
	</div>
</template>

<script>
export default {
	name: "ErrorPage",
	props: ["error"],
	// layout: "error", // you can set a custom layout for the error page
}
</script>
