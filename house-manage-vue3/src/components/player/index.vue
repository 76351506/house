<template>
  <div class="media-player-wraper">
    <div class="media-player">
      <video ref="videoPlayer"></video>
    </div>
    <div class="media-tool">
      <a-button @click="onPlay">直播</a-button>
      <a-driver />
      <a-button @click="onPause">暂停</a-button>
      <a-button @click="onMuted">静音</a-button>
      <a-button @click="onStop">停播</a-button>
      <a-slider :tooltip-visible="true" @change="onVolumechange" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount, defineProps, ref } from 'vue'
import { generatorLiveAddress } from '@/utils'
import flvjs from 'flv.js'

defineProps({
  volume: {
    type: Number,
    default: 50
  }
})
console.log(generatorLiveAddress('live', 'stream'))
const videoPlayer = ref<HTMLElement | null>(null)
let flvPlayer: any = null
if (flvjs.isSupported()) {
  flvPlayer = flvjs.createPlayer({
    type: 'flv',
    isLive: true,
    cors: true,
    url: generatorLiveAddress('live', 'stream')
  })
}
onMounted(() => {
  console.log(videoPlayer.value)
  flvPlayer.attachMediaElement(videoPlayer.value)
  flvPlayer.load()
})
onBeforeUnmount(() => {
  flvPlayer.stop()
})
const onPlay = () => {
  flvPlayer.play()
}
const onStop = () => {
  flvPlayer.stop()
}
const onMuted = () => {
  flvPlayer.muted()
}
const onPause = () => {
  flvPlayer.pause()
}
const onVolumechange = (value: number) => {
  flvPlayer.volume = value
}
</script>
<style lang="less">
.media-player {
  background-color: #dec;
}
</style>
