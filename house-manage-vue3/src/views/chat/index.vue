<template>
  <div>
    <Player></Player>
    <div>
      {{ state.list }}
      <p v-for="(list, index) in state.list" :key="index">
        {{ list.user }}:
        <span v-text="list.data"></span>
      </p>
      <a-space>
        <a-input type="text" v-model:value="state.insert" />
        <a-button @click="onClick">发送</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { io, Socket } from 'socket.io-client'
import { onMounted, reactive } from 'vue'
import Player from '@/components/player/index.vue'

const socket: Socket = io('http://127.0.0.1:3000/')

interface IState {
  username: string | null
  insert: string | null
  list: Array<{ user: string; data: string }>
}
const state = reactive<IState>({
  username: '默认用户',
  insert: '',
  list: []
})

onMounted(() => {
  socket.connect()
  socket.on('connect', () => {
    state.username = window.prompt('请输入昵称!')
    socket.emit('join', state.username)
  })
  socket.on('announcement', function (data) {
    console.log('announcement', data)
  })
  socket.on('send.message', (user, data) => {
    state.list.push({ user, data })
  })
})

const onClick = function () {
  if (!state.insert) return
  socket.emit('send.message', state.username, state.insert)
}
</script>

<style></style>
