import { defineStore } from "pinia"
import { ref } from "vue";

// @ts-ignore
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

export const useStateStore = defineStore("state", () => {

	const colorMode = ref<string>("light");
	const toggleColorMode = (): void => {
		colorMode.value = colorMode.value === "dark" ? "light" : "dark";
		const html = document.querySelector("html") as HTMLElement;
		html.setAttribute('data-bs-theme', colorMode.value);
	};

	const popoverList = ref<any[]>([]);
	const tooltipList = ref<any[]>([]);

	const initBootstrap = (): void => {
		// Initialize popovers
		popoverList.value.forEach(popover => popover.dispose());
		const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
		popoverList.value = [...popoverTriggerList].map(popover => new bootstrap.Popover(popover));

		// Initialize tooltips
		tooltipList.value.forEach(tooltip => tooltip.dispose());
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]:not([data-bs-show])');
		tooltipList.value = [...tooltipTriggerList].map(tooltip => new bootstrap.Tooltip(tooltip));
	};

	return { colorMode, toggleColorMode, initBootstrap }
}, {
	persist: process.env.NODE_ENV === 'development' ? true : false,
})
