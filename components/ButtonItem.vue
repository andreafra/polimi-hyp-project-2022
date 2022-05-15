<template > 
    <div class="Button">
        <a :href="link">{{text}}</a>
    </div> 
</template>


<script>
export default {
    name: "ButtonItem",
    props: {
        text: { required: true, type: String },
        link: { required: true, type: URL }
    }
}
</script>

<style scoped>
a {
	color: var(--color-bg-darkt);
    display: inline-block;
    padding: 1em;
    border: 2px solid var(--color-accent-dark);
    border-radius: 15px;
    background-color: var(--color-accent);
	font-family: var(--font-heading);
    text-decoration: none;
}
div :hover {
    background-color: var(--color-accent-dark);
}
</style>
