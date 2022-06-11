<template>
	<header
		class="page-header"
		:class="{ 'header-collapse-active': isMenuActive }"
	>
		<nav class="container header-grid">
			<div class="header-title">
				<nuxt-link to="/">
					<h1>Minturno</h1>
				</nuxt-link>
			</div>
			<div id="header-nav" class="header-nav">
				<!-- TODO: Replace li with a v-for -->
				<ul
					class="nav-list nav-collapse"
					:class="{ 'nav-collapse-active': isMenuActive }"
				>
					<li
						v-for="(item, index) in navItems"
						:key="index"
						class="nav-link"
					>
						<nuxt-link
							:to="item.uri"
							@click.native="isMenuActive = false"
							>{{ item.name }}</nuxt-link
						>
					</li>
				</ul>
			</div>
			<button
				class="nav-menu"
				aria-label="toggle menu"
				aria-controls="heaver-nav"
				:aria-expanded="String(isMenuActive)"
				@click="isMenuActive = !isMenuActive"
			>
				<MenuIcon v-show="!isMenuActive" />
				<XIcon v-show="isMenuActive" />
				<span>{{ isMenuActive ? "Close" : "Menu" }}</span>
			</button>
		</nav>
	</header>
</template>

<script>
import MenuIcon from "./icons/MenuIcon.vue"
import XIcon from "./icons/XIcon.vue"

export default {
	components: { MenuIcon, XIcon },
	data: () => ({
		isMenuActive: false,
		navItems: [
			{ uri: "/itineraries", name: "Itineraries" },
			{ uri: "/pois", name: "Points of Interest" },
			{ uri: "/events", name: "Events" },
			{ uri: "/services", name: "Service Types" },
			{ uri: "/about", name: "About Us" },
			{ uri: "/contacts", name: "Contact Us" },
		],
	}),

	head: () => ({
		meta: [
			{
				name: "theme-color",
				content: "#d6d6b1",
			},
		],
	}),
}
</script>

<style>
.page-header {
	background-color: var(--color-light);
	z-index: 1000;
}

.header-grid {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas:
		"title menu"
		"nav nav";
	font-family: var(--font-family-heading);
	border-bottom: 1px solid var(--color-accent-dark);
}

.header-title {
	align-self: center;
	grid-area: title;
}

.header-title h1 {
	font-size: var(--font-size-header-title);
	color: var(--color-accent-dark);
	margin: 0;
}

.header-title a {
	display: block;
	text-decoration: none;
}

.header-nav {
	font-size: var(--font-size-header-links);
	align-self: center;
	grid-area: nav;
}

.nav-menu {
	display: flex;
	align-self: center;
	grid-area: menu;
	background: none;
	border: none;
	padding: 0;
	height: 2.5em;
	color: var(--color-accent-dark);
	font-family: var(--font-family-body);
	font-size: var(--font-size-header-menu);
}
.nav-menu svg {
	margin-top: 2px;
}

.nav-menu svg,
.nav-menu span {
	align-self: center;
}

.nav-list {
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
}

.nav-link {
	display: block;
	margin-top: 0.5em;
}

.nav-link a {
	display: block;
	padding: 0;
	text-decoration: none;
	color: var(--color-dark);
}

.nav-link .nuxt-link-active {
	color: var(--color-accent-dark);
	text-decoration: underline;
}

.nav-collapse {
	display: none;
}

.nav-collapse-active {
	display: block;
}

.header-collapse-active {
	display: block;
	position: sticky;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
}

.header-collapse-active .header-grid {
	border-bottom: 0;
}

@media screen and (min-width: 840px) {
	.header-grid {
		flex-flow: row;
		grid-template-columns: 1fr auto;
		grid-template-areas: "title nav";
	}

	.nav-menu {
		display: none;
	}
	.nav-collapse {
		display: block;
	}

	.header-collapse-active {
		display: block;
		position: relative;
		height: auto;
		width: auto;
		background-color: var(--color-light);
		top: auto;
		left: auto;
	}

	.nav-link {
		margin: 0;
		display: inline-block;
	}

	.nav-link a {
		padding: var(--space-0);
	}

	.nav-link a:hover,
	.nav-link a:focus {
		color: var(--color-accent-dark);
	}

	.nav-link .nuxt-link-active {
		text-decoration: none;
	}
}
</style>
