# polimi-hyp-project-2022 [![CircleCI](https://circleci.com/gh/QUB3X/polimi-hyp-project-2022/tree/main.svg?style=svg&circle-token=6685188cd9c7a918d4b27068f208345ec1546cbb)](https://circleci.com/gh/QUB3X/polimi-hyp-project-2022/tree/main)

**Team AACF**:
| Name | C.P. | Contributions |
|------|----------------|---------------|
| Alessio Hu | 10683050 | Backend, Components(Carousel, Grid, Next/Prev), Pages (events, PoIs), Data Entry |
| Andrea Franchini | 10560276 | Backend, Layout, Refactoring (JS/CSS), Code QA, PR Reviews |
| Carlo L. Reinotti | 10840446 | Components, Pages (services, events), Data Entry |
| Fabio Camerota | 10864017 | Card, Pages (homepage, about, contacts, itineraries, error),  Data Entry |

<!--
Presentation and Contribution of each group member.
- A comprehensive project documentation explaining how the application has been
organized (components used and functionalities, routing, store...)
- A short description of how, in your opinion, you were relevant to the best practices of the
framework used
-->

## Project Structure

The projects has the classic Nuxt2 folder structure, in particular we used:
- `assets` serves the CSS stylesheets (under `styles`) and the images (under `images`) (that in productions are converted by Webpack to the WebP format)
- `components` contains the Vue Templates we created.
	- `icons/*` are simple HTML/CSS Vue templates to store SVG-in-HTML separately as components.
	- `ButtonPrimary.vue` is a simple button that wraps a NuxtLink component.
	- `Card` is a card that contains a title, a subtitle, a thumbnail, a brief description. It receives an object containing those fields as a prop.
	- `GridView` exploits `<slot />` to render its children as elements of a CSS grid. It is used in the group-of-topics pages.
	- `HScrollView` is a horizontally scrollable container that acts as a carousel. It uses CSS [`scroll-snap`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) to behave smoothly on desktop and mobile alike. It contains also JS code to dynamically display buttons that allow to scroll the content, should the user decide not to scroll natively (e.g. not using Shift+Scroll, dragging...)
	- `ImageLoader` wraps an `<img>` to reduce repetitions of the webpack import string.
	- `MapContainer` wraps the `<iframe>` used to display an embed of Google Maps for the Itinerary and PoI pages.
	- `PageHeader` and `PageFooter` are quite self-explanatory.
	- `StepsNavigator` is the component shown at the end of Itinerary and PoI (in an Itineray) Pages. It consists of two links that point to the previous and next element of a collection.
- `layouts` contains the default layout that is used throughout the website, and the error page layout.
- `mixins` contains `utils.js` which is a collection of useful snippets of code that are used frequently in the website, mostly string operations and converting objects from the Database to Card props.
- `pages` is divided in:
	- `events/`, `itineraries/`, `pois/`, `services/`:
		- `_id.vue` is the single page of a topic
		- `index.vue` is the group of topics page, basically a grid that lists all the entries.
	- `about.vue` and `contacts.vue` are simple static pages.
	- `index.vue` is the homepage.
- `static` to serve the favicon.

`server/api` contains the code that runs the server, and consist of:
- `index.js` - Express API endpoints declarations
- `database.js` - Table definitions
- `seed.js` - Populates the db from the JSON files in `server/api/data/*.json`

We did not use the VueX/store functionality since our website simply displays results from the database, and therefore we don't need advanced state management.

We created components with the aim to minimize code repetitions (hence the `ImageLoader`, `Card`...) as well as to minimize CSS conflicts since each components styles only itself thanks to scoped styles.

We (obviously) decided to run our website with Server Side Rendering (SSR) because it's theoretically better for SEO, as the website content is immediately available without running JS.

The website was implemented as mobile-first, and we decided to not use Bootstrap/Tailwind for didactic purposes (learning CSS, mostly) while leveraging modern CSS features such as flexbox, grid, scroll-snap, variables (all of which have at least >90% adoption rate according to caniuse.com).

For example most of the media queries simply change variables such as the number of columns to adapt the page layout to bigger screens.

We tested the website through both Lighthouse and WAVE, and relevant ARIA attributes have been used (e.g.: for certain background images, and for the header menu when displayed on a small screen to tell whether it's collapsed or not).
