<script setup lang="ts">
interface Props {
  videoId: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'YouTube video'
})

const embedUrl = computed(() => {
  return `https://www.youtube.com/embed/${props.videoId}`
})
</script>

<template>
  <div class="youtube-embed">
    <iframe
      :src="embedUrl"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.youtube-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
