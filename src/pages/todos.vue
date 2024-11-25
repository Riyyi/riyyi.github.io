<template>
	<TodoBrowse />
	<br>
	<TodoAdd />
	<br>
	<Button @click="showToast()" type="button">Toast</Button>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const toast = useToast();

async function showToast() {
	toast.add({ severity: "success", summary: "This is a toast", detail: "Wow!", life: 3000 });
}

</script>
