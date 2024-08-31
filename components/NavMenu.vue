<template>
    <nav class="flex justify-around p-4 bg-gray-100">
        <NuxtLink to="/" class="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Início</NuxtLink>
        <NuxtLink to="/models" class="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Models</NuxtLink>
        <NuxtLink to="/chat" class="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Chat Normal</NuxtLink>
        <NuxtLink to="/chat-stream" class="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Chat com Stream
        </NuxtLink>
        <NuxtLink to="/config" class="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Configurações</NuxtLink>
        <NuxtLink to="/conversations" class="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md">Conversas</NuxtLink>
    </nav>
</template>