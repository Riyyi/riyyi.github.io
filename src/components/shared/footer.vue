<template>
	<footer class="row mb-2">
		<div class="col-12">
			© {{ year }} Rick van Vonderen
		</div>
	</footer>
</template>

<style scoped>
footer {
	text-align: center;
	color: #909090;
}
</style>

<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>
