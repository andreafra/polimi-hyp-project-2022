<template>
	<div>
		<h1 v-if="error.statusCode === 404">Oops! Page not found</h1>
		<h1 v-else>An error occurred</h1>
		<div class="welcome-image">
			<h2>We can't find the page you are looking for</h2>
			<button-primary :link="'/'" :title="'Back to Home page'" />
		</div>
	</div>
</template>

<script>
import ButtonPrimary from "~/components/ButtonPrimary.vue"
export default {
	name: "ErrorPage",
	components: { ButtonPrimary },
	props: ["error"],
	// layout: "error", // you can set a custom layout for the error page
}
</script>

<style scoped>
.welcome-image {
	margin-top: var(--space-1);
	padding: var(--space-0);
	width: 100%;
	height: 30em;
	border-radius: var(--border-radius);

	background-image: linear-gradient(
			0deg,
			var(--color-light),
			rgba(214, 214, 177, 0)
		),
		url("~/assets/images/home2.jpg?webp");

	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
}

h1 {
	font-size: 3.5em;
	margin: 0 0;
}
</style>
