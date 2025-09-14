<template>
	<video ref="videoRef" :class="props.class" controls>
		<source :src="loadedSrc" type="video/webm">
		Your browser does not support the video tag.
	</video>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

const props = defineProps({
	src: {
		type: String,
		default: ""
	},
	class: {
		type: String,
		default: "w-100"
	},
});

const loadedSrc = ref<string>();
const refinedSrc = computed(() => {
	return getPublicPath(props.src);
});

const videoRef = ref<HTMLVideoElement | null>(null)

function lazyLoadVideos() {
	const video = videoRef.value;
	if (!video || !isInViewport(video)) return;

	removeEvents();
	loadedSrc.value = refinedSrc.value;
	video.load();
}

function removeEvents() {
	window.removeEventListener("scroll", lazyLoadVideos);
	window.removeEventListener('resize', lazyLoadVideos);
}

onMounted(() => {
	setTimeout(() => {
		window.addEventListener("scroll", lazyLoadVideos);
		window.addEventListener("resize", lazyLoadVideos);
		lazyLoadVideos(); // trigger immediately
	}, 500);
});

onUnmounted(() => {
	removeEvents();
});
</script>

<!--
	 Usage:

	::VideoLazy{:src="/img/path-to-video.webm" .myclass .my-other-class}
	::
-->
