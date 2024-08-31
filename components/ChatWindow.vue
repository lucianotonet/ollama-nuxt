<template>
  <div class="flex flex-col h-full">
    <ChatHeader />
    <div class="flex-grow overflow-y-auto p-4" ref="messagesContainer">
      <div v-for="(message, index) in chatStore.messages" :key="index" :class="[ 'mb-4 p-3 rounded-lg', message.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start' ]">
        <span v-html="formatMessage(message.content)"></span>
      </div>
    </div>
    <div v-if="chatStore.error" class="text-red-500 text-center mb-4">
      {{ chatStore.error }}
    </div>
    <div class="bg-white p-4 flex">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Digite sua mensagem..." :disabled="chatStore.isLoading" class="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <button @click="sendMessage" :disabled="chatStore.isLoading" class="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300">
        {{ chatStore.isLoading ? 'Enviando...' : 'Enviar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useChatStore } from '~/stores/chat'
import ChatHeader from '~/components/ChatHeader.vue'

const chatStore = useChatStore()
const userInput = ref('')
const messagesContainer = ref(null)

const sendMessage = async () => {
  if (userInput.value.trim() === '') return
  await chatStore.sendMessage(userInput.value)
  userInput.value = ''
}

const formatMessage = (content) => {
  return content.replace(/\n/g, '<br>')
}

watch(() => chatStore.messages, () => {
  scrollToBottom()
}, { deep: true })

const scrollToBottom = () => {
  setTimeout(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }, 0)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style>
@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
.animate-blink {
  animation: blink 0.7s infinite;
}
</style>