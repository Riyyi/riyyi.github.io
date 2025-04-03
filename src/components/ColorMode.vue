<template>
	<div class="dropup position-fixed corner">
		<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
			<template v-if="store.colorMode === 'light'">
				<IFaSolidSun />
			</template>
			<template v-else-if="store.colorMode === 'dark'">
				<IFaSolidMoon />
			</template>
			<template v-else>
				<IFaAdjust />
			</template>
		</a>
		<ul class="dropdown-menu">
			<li>
				<a class="dropdown-item" :class="store.colorMode === 'light' ? 'active' : ''" @click="store.setColorMode('light')">
					<IFaSolidSun /> Light &nbsp;
					<IFaCheck v-if="store.colorMode === 'light'" class="font-smaller float-right" />
				</a>
			</li>
			<li>
				<a class="dropdown-item" :class="store.colorMode === 'dark' ? 'active' : ''" @click="store.setColorMode('dark')">
					<IFaSolidMoon /> Dark &nbsp;
					<IFaCheck v-if="store.colorMode === 'dark'" class="font-smaller float-right" />
				</a>
			</li>
			<li>
				<a class="dropdown-item" :class="store.colorMode === 'auto' ? 'active' : ''" @click="store.setColorMode('auto')">
					<IFaAdjust width="1.3em" /> Auto &nbsp;
					<IFaCheck v-if="store.colorMode === 'auto'" class="font-smaller float-right" />
				</a>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.corner {
	right: 10px;
	bottom: 10px;
}

.dropdown-menu {
	min-width: 125px;
}

.font-smaller {
	font-size: .6rem;
}
</style>

<script setup lang="ts">
import { useStateStore } from "@/stores/stateStore";

const store = useStateStore();
</script>
