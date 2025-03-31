<template>
	<SharedHeader />
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="content shadow p-4 mb-4">
					<slot />
				</div>
			</div>
		</div>
		<SharedFooter />
	</div>
	<ToggleColorMode />
</template>

<style scoped>
.container {
	margin: 56px auto 0 auto;
}

.content {
	position: relative;
	min-height: calc(100vh - 104px - .5rem);
	padding: 20px 20px 50px 20px;

	background-color: #fff;
}

@media (min-width: 576px) {

	.container,
	.container-sm {
		max-width: 540px;
	}
}

@media (min-width: 768px) {

	.container,
	.container-md,
	.container-sm {
		max-width: 630px;
	}
}

@media (min-width: 992px) {

	.container,
	.container-lg,
	.container-md,
	.container-sm {
		max-width: 720px;
	}
}

@media (min-width: 1200px) {

	.container,
	.container-lg,
	.container-md,
	.container-sm,
	.container-xl {
		max-width: 960px;
	}
}

@media (min-width: 1400px) {

	.container,
	.container-lg,
	.container-md,
	.container-sm,
	.container-xl,
	.container-xxl {
		max-width: 960px;
	}
}
</style>
