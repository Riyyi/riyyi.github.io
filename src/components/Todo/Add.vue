<template>
	<Form v-slot="$form" ref="formRef" :initialValues :resolver @submit="onFormSubmit"
		class="flex flex-col gap-4 w-full sm:w-56">
		<!-- {{ $form }} -->
		<div class="flex flex-col gap-1">
			<InputText @input="initial = false;" v-model="formData.title" name="title" type="text" placeholder="Title"
				autocomplete="off" fluid />
			<Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
				{{ $form.title.error?.message }}
			</Message>
		</div>
		<Button :disabled="initial || !$form.valid" class="fr" type="submit" severity="secondary" label="Submit" />
	</Form>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/stores/todoStore";
import { todoSchema } from "@/schemas/todo";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { v4 as uuidv4 } from "uuid";

import { type FormSubmitEvent } from "@primevue/forms/form";

const store = useTodoStore();
const toast = useToast();
const resolver = zodResolver(todoSchema);

const initial = ref(true); // makes submit button disabled
const initialValues = ref({
	title: ""
});
const formRef = ref<HTMLElement | null>(null);
const formData = ref({ ...initialValues.value }); // copy data from initialValues

async function onFormSubmit(e: FormSubmitEvent) {
	if (e.valid) {
		toast.add({ severity: "success", summary: "Todo added", life: 3000 });

		store.todos.push({
			id: uuidv4(),
			title: e.values?.title || e.states?.title.value
		});

		// Reset the form
		initial.value = true;
		formData.value = { ...initialValues.value }; // copy data from initialValues
	}
	else {
		toast.add({ severity: "error", summary: "Invalid request", life: 3000 });
	}
};

</script>

<style scoped>
.fr {
	float: right;
}
</style>
