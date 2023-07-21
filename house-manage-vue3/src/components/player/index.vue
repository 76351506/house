<template>
  <div class="media-player-wraper">
    <div class="media-player-empyt" v-if="videoPlayer == null">直播未开始！</div>
    <div class="media-player-video" v-else>
      <video ref="videoPlayer"></video>
    </div>
    <div class="media-player-tool">
      <a-space>
        <a-button @click="onPlay">直播</a-button>
        <a-button @click="onPause">暂停</a-button>
        <a-button @click="onMuted">静音</a-button>
        <a-button @click="onStop">停播</a-button>
      </a-space>
      <a-slider :tooltip-visible="true" @change="onVolumechange" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, nextTick, defineProps, ref } from 'vue'
import { generatorLiveAddress } from '@/utils'
import flvjs, { mediaDataSource } from 'flv.js'

defineProps({
  volume: {
    type: Number,
    default: 50
  }
})

let videoPlayer = ref<HTMLElement | null>(null)
let flvPlayer = ref<any | null>(null)

onMounted(() => {
  if (flvjs.isSupported()) {
    const url = generatorLiveAddress('live', 'stream')
    const config: mediaDataSource = {
      type: 'flv',
      isLive: true,
      url
    }
    flvPlayer.value = flvjs.createPlayer(config, {
      deferLoadAfterSourceOpen: false
    })
  }
})

const onPlay = () => {
  flvPlayer.value.attachMediaElement(videoPlayer.value)
  flvPlayer.value.load()
  flvPlayer.value.play()
}
const onStop = () => {
  console.log('onStop')
}
const onMuted = () => {
  console.log('onMuted')
}
const onPause = () => {
  console.log('onPause')
}
const onVolumechange = (value: number) => {
  // flvPlayer.volume = value
}
</script>
<style lang="less">
.media-player-wraper {
  width: 100%;
  background-color: #333;

  .media-player-empyt {
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  .media-player-video {
    height: 100%;
    width: 100%;
    & > video {
      display: block;
      width: 100%;
    }
  }
}
</style>
