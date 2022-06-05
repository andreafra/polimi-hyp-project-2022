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
						<nuxt-link to="/events">All Events</nuxt-link>
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
					<li class="footer-link">(c) City of Minturno</li>
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
					<li class="footer-link">
						<p><i> City Office: </i></p>
						<p>
							Via Principe di Piemonte, 9<br />04026 Minturno (LT)
						</p>
					</li>

					<li class="footer-link">
						<p><i> Email: </i></p>
						<p>minturno@legalmail.it</p>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<style>
.page-footer {
	background-color: var(--color-dark);
	color: var(--color-light);
	padding-bottom: var(--space-2);
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
