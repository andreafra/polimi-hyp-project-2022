<template>
	<header class="page-header">
		<div class="container header-flex">
			<div class="title">
				<nuxt-link to="/">
					<h1>LONG TITLE</h1>
				</nuxt-link>
			</div>
			<nav class="nav">
				<ul class="nav-list">
					<li class="nav-link">
						<nuxt-link to="/itineraries">Itineraries</nuxt-link>
					</li>
					<li class="nav-link">
						<nuxt-link to="/pois">Points of Interest</nuxt-link>
					</li>
					<li class="nav-link">
						<nuxt-link to="/events">Events</nuxt-link>
					</li>
					<li class="nav-link">
						<nuxt-link to="/services">Service Types</nuxt-link>
					</li>
					<li class="nav-link">
						<nuxt-link to="/contacts">Contact Us</nuxt-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
export default {}
</script>

<style>
.page-header {
	background-color: var(--color-light);
}

.header-flex {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid var(--color-accent-dark);
	font-family: var(--font-family-heading);
}

.title {
	font-size: var(--font-size-header-title);
	align-self: baseline;
}

.title h1 {
	color: var(--color-accent-dark);
	margin: 0;
}

.title a {
	text-decoration: none;
}

.nav {
	font-size: var(--font-size-header-links);
	align-self: baseline;
}

.nav-list {
	list-style: none;
	margin: 0;
	padding: 0;
}

.nav-link {
	display: inline-block;
}

.nav-link a {
	display: block;
	padding: 0 0.5em;
	text-decoration: none;
	color: var(--color-dark);
}
</style>
