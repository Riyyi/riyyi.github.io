<template>
	<h2>CV</h2>
	<p>
		Download the PDF here:
		<a :href="getPublicPath('/pdf/cv-en-rick-van-vonderen.pdf')" target="_blank">English</a>,&nbsp;
		<a :href="getPublicPath('/pdf/cv-rick-van-vonderen.pdf')" target="_blank">Nederlands</a>
	</p>

	<object :data="getPublicPath('/pdf/cv-en-rick-van-vonderen.pdf')" type="application/pdf"
		style="width: 100%; height: calc(100vh - 280px)"></object>
</template>
