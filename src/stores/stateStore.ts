import { defineStore } from "pinia"
import { ref } from "vue";

export const useStateStore = defineStore("state", () => {

	const colorMode = ref<string>("light");
	const toggleColorMode = (): void => {
		colorMode.value = colorMode.value === "dark" ? "light" : "dark";
		const html = document.querySelector("html") as HTMLElement;
		html.setAttribute('data-bs-theme', colorMode.value);
	};

	return { colorMode, toggleColorMode }
}, {
	persist: process.env.NODE_ENV === 'development' ? true : false,
})
