<template>
  <div class="flex flex-col h-screen">
    <NavMenu class="sticky top-0 z-20" />
    <NuxtPage class="flex-grow overflow-auto" />
  </div>
</template>

<script setup>
import NavMenu from '~/components/NavMenu.vue'
</script>

<style>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
