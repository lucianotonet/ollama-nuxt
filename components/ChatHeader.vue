<template>
  <header class="flex justify-between items-center p-4 bg-gray-100 sticky top-0 z-10">
    <h1 class="text-xl font-bold">Chat GPT Local</h1>
    <div class="flex items-center">
      <label for="model-select" class="mr-2">Modelo:</label>
      <select id="model-select" v-model="chatStore.selectedModel" @change="onModelChange" class="p-2 border rounded">
        <option v-for="model in chatStore.models" :key="model.name" :value="model.name">
          {{ model.displayName }}
        </option>
      </select>
    </div>
    <button @click="clearChat" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Limpar Chat</button>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '~/stores/chat'

const chatStore = useChatStore()

onMounted(async () => {
  await chatStore.fetchModels()
})

const clearChat = () => {
  chatStore.clearChat()
}

const onModelChange = () => {
  chatStore.setSelectedModel(chatStore.selectedModel)
}
</script>