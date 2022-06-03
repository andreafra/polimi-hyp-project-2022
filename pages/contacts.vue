<template>
	<article>
		<h1>Contact Us</h1>
		<p>
			To get the best experience in Minturno we recommend you to get in
			touch with one of the many tourist offices in the city. Our staff
			will help you in finding the best location to visit and activities
			to perform!
		</p>
		<p>Here's a list of the tourist offices:</p>
		<ul>
			<li v-for="(office, index) in offices" :key="index">
				<h2>{{ office.name }}</h2>
				<p><b>Phone:</b> {{ office.phone }}</p>

				<p><b> Address:</b> {{ office.address }}</p>

				<p><b>Email:</b> {{ office.email }}</p>
				<p v-if="office.note">{{ office.note }}</p>
			</li>
		</ul>
	</article>
</template>

<script>
export default {
	name: "ContactsPage",
	components: {},
	data: () => ({
		offices: [
			{
				name: "Tourist Information & Help Desk",
				phone: "+39 0771 1978065",
				address: "Pro Loco Scauri Via Appia, 294, 04026 Minturno (LT)",
				email: "iatscauri@comune.minturno.lt.it",
				note: "Dal 1 giugno al 30 settembre presso Arena Mallozzi, Via Lungomare, Scauri",
			},
			{
				name: "Tourist Office",
				phone: "+39 0771 6608250",
				address: "Via Principe di Piemonte, 9, 04026 Minturno (LT)",
				email: "turismo@comune.minturno.lt.it",
			},
			{
				name: "Proloco Minturno",
				phone: "+39 0771 658528",
				address: "Via Appia, 294, Minturno (LT) 04026",
				email: "info@prolocominturno.it",
			},
		],
	}),
}
</script>
