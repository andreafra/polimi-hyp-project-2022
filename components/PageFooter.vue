<template>
	<footer class="page-footer">
		<div class="container footer-grid">
			<div class="footer-column">
				<h2>Small Title</h2>
				<ul class="footer-list">
					<li class="footer-link">AAAAA</li>
					<li class="footer-link">BBBBB</li>
					<li class="footer-link">CCCCC</li>
				</ul>
			</div>
			<div class="footer-column">
				<h2>Small Title</h2>
				<ul class="footer-list">
					<li class="footer-link">AAAAA</li>
					<li class="footer-link">BBBBB</li>
					<li class="footer-link">CCCCC</li>
				</ul>
			</div>
			<div class="footer-column">
				<h2>Small Title</h2>
				<ul class="footer-list">
					<li class="footer-link">AAAAA</li>
					<li class="footer-link">BBBBB</li>
					<li class="footer-link">CCCCC</li>
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
</style>
