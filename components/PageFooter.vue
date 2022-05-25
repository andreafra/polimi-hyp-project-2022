<template>
	<footer class="page-footer">
		<div class="container footer-grid">
			<div class="footer-column">
				<h2>Navigation</h2>
				<ul class="footer-list">
					<li class="footer-link">
						<nuxt-link to="/">Home Page</nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/itineraries">All Itineraries</nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/pois">All Points of Interest</nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/all_events">All Events</nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/services">All Service Types</nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/about">About the Town</nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/contacts">Contact Us</nuxt-link>
					</li>
				</ul>
			</div>
			<div class="footer-column">
				<h2>Legal</h2>
				<ul class="footer-list">
					<li class="footer-link">(c) Town of XXX</li>
					<li class="footer-link">
						<nuxt-link to="/"> Cookies </nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/"> Privacy Policy </nuxt-link>
					</li>
					<li class="footer-link">
						<nuxt-link to="/"> Terms of Service </nuxt-link>
					</li>
				</ul>
			</div>
			<div class="footer-column">
				<h2>Contacts</h2>
				<ul class="footer-list">
					<li class="footer-link">Town Office</li>
					<li class="footer-link">Corso Roma, 1</li>
					<li class="footer-link">Phone Number</li>
					<li class="footer-link">+39 555-5555555</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<style>
.page-footer {
	background-color: var(--color-dark);
	color: var(--color-light);
}

.footer-grid {
	display: grid;
	grid-template-columns: var(--grid-template-columns);
}

.footer-column h2 {
	margin: 1em 0 0.5em;
	color: var(--color-accent);
}

.footer-list {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.footer-link {
	margin-bottom: 0.25em;
}

.footer-link a,
.footer-link a:visited {
	text-decoration: none;
	color: var(--color-light);
}
.footer-link a:hover {
	cursor: pointer;
	text-decoration: none;
	color: var(--color-accent);
}
</style>
