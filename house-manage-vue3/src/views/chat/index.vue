<template>
  <div>
    <div>
      <p v-for="(list, index) in state.list" :key="index">
        {{ list.user }}:
        <span v-text="list.data"></span>
      </p>
    </div>
    <input type="text" v-model="state.insert" />
    <button @click="onClick">发送</button>
  </div>
</template>

<script lang="ts" setup>
import { io, Socket } from 'socket.io-client'
import { onMounted, reactive } from 'vue'
const socket: Socket = io('http://10.37.7.94:3000/')

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
    console.log(data)
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
