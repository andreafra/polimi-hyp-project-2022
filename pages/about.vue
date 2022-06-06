<template>
	<article>
		<h1>About Us</h1>
		<p>
			Minturno is a city and comune in the southern Lazio, Italy, situated
			on the north west bank of the Garigliano (known in antiquity as the
			Liris), with a suburb on the opposite bank about 18 kilometres (11
			mi) from its mouth, at the point where the Via Appia crossed it by
			the bridge called Pons Tiretius. main railway line.
		</p>
		<p>It has a station on the Rome-Naples</p>
		<h2>History</h2>
		<p>
			The ancient Minturnae was one of the three towns of the Ausones
			which made war against Rome in 314 BC, the other two being called
			Ausona (modern Sessa Aurunca) and Vescia. It became a colony in 296
			BC.
		</p>
		<p>
			The city was probably destroyed in 883 by the Saracens, who in the
			following years held the surrounding plain. Its low site was
			increasingly abandoned by the population in favour of that of the
			modern town of Minturno (known as Traetto or Traietto, from Latin
			Traiectum, until the 19th century), 140 metres (460 ft) above
			sea-level.
		</p>
		<p>
			The Saracens were ousted by the Catholic league after the Battle of
			Garigliano (915), and Minturnae passed to Gaeta. Two years later,
			however, it was again ravaged, this time by the Magyars. In 1058 it
			was partly acquired by the Abbey of Montecassino, but soon after was
			conquered by the Normans.
		</p>
		<p>
			In the 13th century it went to Richard V dell'Aquila, duke of Gaeta.
			Subsequently, it was a Caetani possession, and later assigned by
			Charles VIII of France to his general Prospero Colonna. It was a
			Carafa fief until 1806, and was integrated in the newly formed
			Kingdom of Italy on 30 October 1861.
		</p>
		<image-loader src="about1.jpg" alt="Ponte Ferdinando" />
		<h2>Roman Remains</h2>
		<p>
			The Roman ruins consist of an amphitheatre (now almost entirely
			demolished, but better preserved in the 18th century), a theatre in
			opus reticulatum, and an aqueduct in opus reticulatum, the quoins of
			which are of various colours arranged in patterns to produce a
			decorative effect. There are also a statue commonly called of
			Sepeone (Scipio), from the Late Empire, and the remains of a
			Capitolium, built in Italic style after 191 BC, near the Appian Way.
		</p>
		<image-loader src="about2.jpg" alt="roman amphitheatre" />
	</article>
</template>

<script>
export default {
	name: "AboutPage",
	components: {},
	head() {
		return {
			title: "About Us",
			meta: [
				{
					hid: "description",
					name: "description",
					content: `About us page`,
				},
			],
		}
	},
}
</script>
