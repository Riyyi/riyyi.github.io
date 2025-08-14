import { useAsyncData, queryCollection } from "#imports"
import type { ContentCollectionItem } from "@nuxt/content"

export const articleCollection = async (category: string) => {
	const { data } = await useAsyncData<ContentCollectionItem[] | null>(
		`${category}-articles`,
		() => queryCollection("content").where("tags", "LIKE", `%${category}%`).order("date", "DESC").all()
	);

	return { articles: data }
}
