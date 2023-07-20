<template>
  <div>
    <video ref="videoPlayer" width="640" height="360"></video>
    <div>
      <p v-for="(list, index) in state.list" :key="index">
        {{ list.user }}:
        <span v-text="list.data"></span>
      </p>
    </div>
    <input type="text" v-model="state.insert" />
    <button @click="onClick">发送</button>
    <button @click="onPlay">开始直播</button>
  </div>
</template>

<script lang="ts" setup>
import { io, Socket } from 'socket.io-client'
import { onMounted, reactive, ref } from 'vue'
import flvjs from 'flv.js'

const socket: Socket = io('http://127.0.0.1:3000/')

interface IState {
  username: string | null
  insert: string | null
  list: Array<{ user: string; data: string }>
}
const videoPlayer = ref<HTMLElement | null>(null)
const state = reactive<IState>({
  username: '默认用户',
  insert: '',
  list: []
})
let flvPlayer: any = null
if (flvjs.isSupported()) {
  flvPlayer = flvjs.createPlayer({
    type: 'flv',
    url: 'http://127.0.0.1:23481/live/stream.flv'
  })
}

onMounted(() => {
  console.log(videoPlayer.value)
  flvPlayer.attachMediaElement(videoPlayer.value)
  flvPlayer.load()
  socket.connect()
  socket.on('connect', () => {
    state.username = window.prompt('请输入昵称!')
    socket.emit('join', state.username)
  })
  socket.on('announcement', function (data) {
    console.log(data)
  })
  socket.on('send.message', (user, data) => {
    state.list.push({ user, data })
  })
})
const onPlay = () => {
  flvPlayer.play()
}
const onClick = function () {
  if (!state.insert) return
  socket.emit('send.message', state.username, state.insert)
}
</script>

<style></style>
