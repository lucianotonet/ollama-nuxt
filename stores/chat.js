import { defineStore } from 'pinia'
import axios from 'axios'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    isLoading: false,
    error: null,
    models: [],
    selectedModel: '',
    currentStreamingMessage: null,
    baseUrl: '',
  }),
  actions: {
    async fetchModels() {
      try {
        // ...

        const response = await axios.get(`${this.baseUrl}/api/tags`)
        this.models = response.data.models.map(model => ({
          name: model.name,
          displayName: `${model.name} (${model.details.parameter_size})`,
        }))
        if (this.models.length > 0 && !this.selectedModel) {
          this.selectedModel = this.models[0].name
        }
      } catch (error) {
        console.error('Erro ao buscar modelos:', error)
        this.error = 'Não foi possível carregar os modelos disponíveis.'
      }
    },
    async sendMessage(content) {
      this.isLoading = true
      this.error = null
      const userMessage = { role: 'user', content }
      this.messages.push(userMessage)

      try {
        const response = await axios.post(`${this.baseUrl}/api/chat`, {
          model: this.selectedModel,
          messages: this.messages.map(msg => ({ role: msg.role, content: msg.content })),
          stream: false
        })

        const assistantMessage = { role: 'assistant', content: response.data.message.content }
        this.messages.push(assistantMessage)
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
        this.error = 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
      } finally {
        this.isLoading = false
      }
    },
    clearChat() {
      this.messages = []
      this.error = null
      this.currentStreamingMessage = null
    },
    setSelectedModel(model) {
      this.selectedModel = model
      this.clearChat()
    },
    async sendStreamMessage(content) {
      this.isLoading = true
      this.error = null
      const userMessage = { role: 'user', content }
      this.messages.push(userMessage)

      try {
        const response = await fetch(`${this.baseUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.selectedModel,
            messages: this.messages.map(msg => ({ role: msg.role, content: msg.content })),
            stream: true,
          }),
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        this.currentStreamingMessage = { role: 'assistant', content: '' }
        this.messages.push(this.currentStreamingMessage)

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.trim() !== '') {
              try {
                const parsedChunk = JSON.parse(line)
                if (!parsedChunk.done) {
                  this.currentStreamingMessage.content += parsedChunk.message.content
                }
              } catch (e) {
                console.error('Erro ao processar chunk:', e)
              }
            }
          }
        }

        this.currentStreamingMessage = null
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
        this.error = 'Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
      } finally {
        this.isLoading = false
      }
    },
  }
})