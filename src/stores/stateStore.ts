import { defineStore } from "pinia"
import { ref } from "vue";

// @ts-ignore
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

export const useStateStore = defineStore("state", () => {

	const colorMode = ref<string>("auto");
	const setColorMode = (newMode: string): void => {
		colorMode.value = newMode;
		applyColorMode();
	};
	const applyColorMode = (): void => {
		let css = "light";
		if (colorMode.value === "auto") {
			const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (preferDark) {
				css = "dark";
			}
		}
		else if (colorMode.value == "dark") {
			css = "dark";
		}

		const html = document.documentElement as HTMLElement;

		// Theme used by Bootstrap
		html.setAttribute('data-bs-theme', css);

		// Theme class used by shiki syntax highlighting
		html.classList.remove("dark");
		if (css === "dark") {
			html.classList.add("dark");
		}
	}

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

	return { colorMode, setColorMode, applyColorMode, initBootstrap }
}, {
	persist: {
		pick: ["colorMode"],
		storage: localStorage
	}
})
