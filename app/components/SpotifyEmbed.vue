<script setup lang="ts">
interface Props {
  type: 'artist' | 'track' | 'album'
  id: string
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 352
})

const embedUrl = computed(() => {
  return `https://open.spotify.com/embed/${props.type}/${props.id}?utm_source=generator&theme=0`
})
</script>

<template>
  <div class="spotify-embed">
    <iframe
      :src="embedUrl"
      width="100%"
      :height="height"
      frameborder="0"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      :title="`Spotify ${type} embed`"
    />
  </div>
</template>

<style scoped>
.spotify-embed {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.spotify-embed iframe {
  display: block;
}
</style>
