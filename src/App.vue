<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col h-full max-w-lg min-h-screen m-auto bg-gray-100 font-vazir" dir="rtl">
    <RouterView />
  </div>
</template>

<style>
body {
  @apply bg-gray-100
}
</style>